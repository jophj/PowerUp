DpsRankTable.$inject = ['$scope', 'CpM', 'damageCalculator', 'dpsCalculator', 'totalDpsCalculator', 'effectivenessCalculator', 'ObjectToArray', 'Pokemons', 'Moves']
function DpsRankTable(scope, CpM, damageCalculator, dpsCalculator, totalDpsCalculator, effectivenessCalculator, ObjectToArray, Pokemons, Moves) {
  const ctrl = this

  const pokemons = ObjectToArray(Pokemons)
  ctrl.dpsCalculator = dpsCalculator
  const cpM = {}
  CpM.cpMultiplier.forEach((cpm, i) => {
    cpM[i+1] = cpm
    if (i < 39) {
      cpM[(i+1)+'.5'] = Math.sqrt((cpm*cpm + CpM.cpMultiplier[i+1]*CpM.cpMultiplier[i+1])/2)
    }
  })

  const mapMoveIdToMove = (mId) => Moves[mId]

  function computeRanking() {
    if (!ctrl.defenseCpm || !ctrl.pokemon) {
      return
    }

    const everyPokemonMovesetData = []
    pokemons.forEach(p => {
      p.quickMoves.map(mapMoveIdToMove).forEach(q => {
        p.cinematicMoves.map(mapMoveIdToMove).forEach(c => {
          const qStab = q.type === p.type || q.type === p.type2 ? 1.2 : 1
          const qEffectiveness = effectivenessCalculator(q.type, ctrl.pokemon.type, ctrl.pokemon.type2)
          const cStab = c.type === p.type || c.type === p.type2 ? 1.2 : 1
          const cEffectiveness = effectivenessCalculator(c.type, ctrl.pokemon.type, ctrl.pokemon.type2)

          const totalDps = totalDpsCalculator(
            p.stats.baseAttack + 15,
            { power: q.power, durationMs: q.durationMs, stab: qStab, effectiveness: qEffectiveness, energyDelta: q.energyDelta },
            { power: c.power, durationMs: c.durationMs, stab: cStab, effectiveness: cEffectiveness, energyDelta: c.energyDelta },
            cpM[40],
            ctrl.pokemon.stats.baseDefense + 15,
            ctrl.defenseCpm
          )
          
          const moveData = moveDataCalculator(cpM, p, q, ctrl.pokemon, ctrl.defenseCpm, effectivenessCalculator, damageCalculator)
          everyPokemonMovesetData.push({
            pokemonName: p.name,
            quickMoveName: q.name,
            cinematicMoveName: c.name,
            dps: totalDps,
            breakpointData: moveData
          })
        })
      })
    })
    ctrl.ranking = everyPokemonMovesetData
      .sort((a, b) => b.dps - a.dps)
      .slice(0, 256)
  }

  scope.$watch('$ctrl.pokemon', computeRanking)
  scope.$watch('$ctrl.defenseCpm', computeRanking)
  scope.$watch('$ctrl.onlyQuickMoves', computeRanking)
}

// TODO move to service
function moveDataCalculator(cpM, p, m, defenderPokemon, defenseCpm, effectivenessCalculator, damageCalculator) {
  const moveData = {}
  const stab = m.type === p.type || m.type === p.type2 ? 1.2 : 1
  const effectiveness = effectivenessCalculator(m.type, defenderPokemon.type, defenderPokemon.type2)
  for (let iv = 10; iv <= 15; iv++) {
    const dmgByLevel = []
    for (let level = 1; level <= 40; level += .5) {
      const dmg = damageCalculator(p.stats.baseAttack, iv, m.power, cpM[level], defenderPokemon.stats.baseDefense, defenseCpm, stab, effectiveness)
      dmgByLevel.push(dmg)
    }
    const breakpointLevel = getLastBreakPointData(dmgByLevel)
    moveData[iv] = breakpointLevel
  }

  return moveData
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
  name: 'dpsRankTable',
  config: {
    template: require('./dpsRankTable.component.html'),
    controller: DpsRankTable,
    bindings: {
      defenseCpm: '=',
      pokemon: '=',
      onlyQuickMoves: '='
    }
  }
}
