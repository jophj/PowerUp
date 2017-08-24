DpsChartViewController.$inject = ['$scope', '$location', '$routeParams', 'Pokemons', 'CpM']
function DpsChartViewController(scope, location, routeParams, Pokemons, CpM) {
  const ctrl = this

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

  scope.$watch('$ctrl.level', () => {
    onSelectedLevel(ctrl.level)
    location.search('level', ctrl.level)
  })
  scope.$watch('$ctrl.defender', () => ctrl.defender ? location.search('defender', ctrl.defender.id) : null)
  scope.$watch('$ctrl.onlyQuickMoves', () => location.search('onlyQuickMoves', ctrl.onlyQuickMoves))

  if (routeParams.defender) {
    ctrl.defender = Pokemons[routeParams.defender] || null
  }
  if (routeParams.level) {
    ctrl.level = routeParams.level || null
    onSelectedLevel(ctrl.level)
  }
  if (routeParams.onlyQuickMoves) {
    ctrl.onlyQuickMoves = routeParams.onlyQuickMoves || false
  }
}

export default {
  name: 'dpsChartView',
  config: {
    template: require('./dpsChartView.component.html'),
    controller: DpsChartViewController
  }
}
