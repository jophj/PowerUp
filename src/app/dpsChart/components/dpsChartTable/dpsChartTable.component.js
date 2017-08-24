DpsChartTable.$inject = ['$scope', 'CpM', 'damageCalculator', 'dpsCalculator', 'effectivenessCalculator', 'ObjectToArray', 'Pokemons', 'Moves']
function DpsChartTable(scope, CpM, damageCalculator, dpsCalculator, effectivenessCalculator, ObjectToArray, Pokemons, Moves) {
  const ctrl = this

  const pokemons = ObjectToArray(Pokemons)
  ctrl.dpsCalculator = dpsCalculator
  ctrl.cpM = {}
  CpM.cpMultiplier.forEach((cpm, i) => {
    ctrl.cpM[i+1] = cpm
    if (i < 39) {
      ctrl.cpM[(i+1)+'.5'] = Math.sqrt((cpm*cpm + CpM.cpMultiplier[i+1]*CpM.cpMultiplier[i+1])/2)
    }
  })

  const mapMoveIdToMove = (mId) => Moves[mId]

  function computeRanking() {
    if (!ctrl.defenseCpm || !ctrl.pokemon) {
      return
    }
    const ranking = pokemons.map((p) => {
      const mapMove = (m) => {
        const moveData = {}
        const stab = m.type === p.type || m.type === p.type2 ? 1.2 : 1
        const effectiveness = effectivenessCalculator(m.type, ctrl.pokemon.type, ctrl.pokemon.type2)
        for (let iv = 10; iv <= 15; iv++) {
          const dmgByLevel = []
          for (let level = 1; level <= 40; level += .5) {
            const dmg = damageCalculator(p.stats.baseAttack, iv, m.power, ctrl.cpM[level], ctrl.pokemon.stats.baseDefense, ctrl.defenseCpm, stab, effectiveness)
            dmgByLevel.push(dmg)
          }
          const breakpointLevel = getLastBreakPointData(dmgByLevel)
          moveData[iv] = breakpointLevel
        }

        const maxDmg = damageCalculator(p.stats.baseAttack, 15, m.power, ctrl.cpM[40], ctrl.pokemon.stats.baseDefense, ctrl.defenseCpm, stab, effectiveness)
        
        return {
          pokemonName: p.name,
          moveName: m.name,
          dps: dpsCalculator(maxDmg, m.durationMs),
          breakpointData: moveData
        }
      }

      let moveRanking = p.quickMoves.map(mapMoveIdToMove).map(mapMove)
      if (!ctrl.onlyQuickMoves) {
        const cinematicRank = p.cinematicMoves.map(mapMoveIdToMove).map(mapMove)
        moveRanking = moveRanking.concat(cinematicRank)
      }
      return moveRanking
    })
    .reduce((p, c) => p.concat(c))
    .sort((a,b) => b.dps - a.dps)

    ctrl.ranking = ranking.slice(0,100)
  }

  scope.$watch('$ctrl.pokemon', computeRanking)
  scope.$watch('$ctrl.defenseCpm', computeRanking)
  scope.$watch('$ctrl.onlyQuickMoves', computeRanking)
}

function getLastBreakPointData(dmgByLevel) {
  let breakpointLevel = 40
  for (let i = dmgByLevel.length; i > 1; i--) {
    if (dmgByLevel[i] > dmgByLevel[i - 1]) {
      return {
        level: (i/2)+1,
        damage: dmgByLevel[i],
        increase: dmgByLevel[i]/dmgByLevel[i-1]
      }
    }
  }
}

export default {
  name: 'dpsChartTable',
  config: {
    template: require('./dpsChartTable.component.html'),
    controller: DpsChartTable,
    bindings: {
      defenseCpm: '=',
      pokemon: '=',
      onlyQuickMoves: '='
    }
  }
}
