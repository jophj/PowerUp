DpsChartViewController.$inject = ['$scope', '$location', '$routeParams', 'Pokemons', 'CpM']
function DpsChartViewController(scope, location, routeParams, Pokemons, CpM) {
  const ctrl = this

  function onSelectedDefender(p) {
    if (!p) return
    ctrl.baseDefense = p.stats.baseDefense
  }

  function onSelectedLevel(level) {
    // level could be raid tier (T1, T2, ...) or pokemon level
    if (typeof level === 'string' && level && level.startsWith('T')) {
      const raidTier = parseInt(level.slice(1))
      ctrl.defenseCpm = CpM.bossCpMultiplier[raidTier - 1]
    }
    else {
      ctrl.defenseCpm = level ? CpM.cpMultiplier[level-1] : CpM.cpMultiplier[39]
    }
  }

  scope.$watch('$ctrl.level', () => location.search('level', ctrl.level))
  scope.$watch('$ctrl.defender', () => ctrl.defender ? location.search('defender', ctrl.defender.id) : null)

  if (routeParams.defender) {
    ctrl.defender = Pokemons[routeParams.defender] || null
    onSelectedDefender(ctrl.defender)
  }
  if (routeParams.level) {
    ctrl.level = routeParams.level || null
    onSelectedLevel(ctrl.level)
  }
}

export default {
  name: 'dpsChartView',
  config: {
    template: require('./dpsChartView.component.html'),
    controller: DpsChartViewController
  }
}
