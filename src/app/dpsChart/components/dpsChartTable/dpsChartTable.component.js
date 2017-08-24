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
    const ranking = pokemons.map((p) => {
      const mapMove = (m) => {
        const moveData = {}
        const stab = m.type === p.type || m.type === p.type2 ? 1.2 : 1
        const effectiveness = effectivenessCalculator(m.type, ctrl.pokemon.type, ctrl.pokemon.type2)
        for (let iv = 10; iv <= 15; iv++) {
          const dmgByLevel = []
          for (let level = 1; level <= 40; level++) {
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

      const quickRank = p.quickMoves.map(mapMoveIdToMove).map(mapMove)
      const cinematicRank = p.cinematicMoves.map(mapMoveIdToMove).map(mapMove)
      return quickRank.concat(cinematicRank)
    })
    .reduce((p, c) => p.concat(c))
    .sort((a,b) => b.dps - a.dps)

    ctrl.ranking = ranking.slice(1,10)
  }

  scope.$watch('$ctrl.pokemon', computeRanking)
  scope.$watch('$ctrl.defenseCpm', computeRanking)
}

function getLastBreakPointData(dmgByLevel) {
  let breakpointLevel = 40
  for (let level = breakpointLevel; level > 1; level--) {
    if (dmgByLevel[level] > dmgByLevel[level - 1]) {
      return {
        level: level,
        damage: dmgByLevel[level],
        increase: dmgByLevel[level]/dmgByLevel[level-1]
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
      defenseCpm: '<',
      pokemon: '<'
    }
  }
}
