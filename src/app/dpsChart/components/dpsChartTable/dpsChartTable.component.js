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
    pokemons.map((p) => {
      const mapMove = (m) => {
        const stab = m.type === p.type || m.type === p.type2 ? 1.2 : 1
        const effectiveness = effectivenessCalculator(m.type, p.type, p.type2)
        const dmg = damageCalculator(p.stats.baseAttack, 15, m.power, ctrl.cpM[39], ctrl.pokemon.stats.baseDefense, ctrl.defenseCpm, stab, effectiveness)
        console.log(dmg)
        return {
          pokemonName: p.name,
          moveName: m.name,
          dps: dpsCalculator()
        }
      }

      const quickRank = p.quickMoves.map(mapMoveIdToMove).map(mapMove)
      const cinematicRank = p.cinematicMoves.map(mapMoveIdToMove).map(mapMove)

      return quickRank.concat(cinematicRank)
    })
  }

  scope.$watch('$ctrl.pokemon', computeRanking)
  scope.$watch('$ctrl.defenseCpm', computeRanking)
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
