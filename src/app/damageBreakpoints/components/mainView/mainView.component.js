MainViewController.$inject = ['$scope', '$location', '$routeParams','Moves', 'Pokemons', 'CpM', 'effectivenessCalculator']
function MainViewController(scope, location, routeParams, Moves, Pokemons, CpM, effectivenessCalculator) {
  const ctrl = this
  let attacker = null
  let move = null

  function onSelectedAttacker(p) {
    if (!p) return
    attacker = p
    ctrl.baseAttack = p.stats.baseAttack
    if (move) {
      ctrl.stab = move.type === attacker.type || move.type === attacker.type2 ? 1.2 : 1
    }
  }
  function onSelectedMove(m) {
    if (!m) return
    move = m
    ctrl.power = m.power
    ctrl.durationMs = move.durationMs
    if (attacker) {
      ctrl.stab = move.type === attacker.type || move.type === attacker.type2 ? 1.2 : 1
    }
    if (m && ctrl.defender) {
      ctrl.effectiveness = effectivenessCalculator(m.type, ctrl.defender.type, ctrl.defender.type2)
    }
    
  }
  function onSelectedDefender(p) {
    if (!p) return
    ctrl.baseDefense = p.stats.baseDefense
    if (move && ctrl.defender) {      
      ctrl.effectiveness = effectivenessCalculator(move.type, ctrl.defender.type, ctrl.defender.type2)
    }
  }

  function onSelectedLevel(level) {
    // level could be raid tier (T1, T2, ...) or pokemon level
    if (level && typeof level === 'string' && level.startsWith('T')) {
      const raidTier = parseInt(level.slice(1))
      ctrl.defenseCpm = CpM.bossCpMultiplier[raidTier - 1]
    }
    else {
      ctrl.defenseCpm = level ? CpM.cpMultiplier[level-1] : CpM.cpMultiplier[39]
    }
  }

  scope.$watch('$ctrl.attacker', () => {
    onSelectedAttacker(ctrl.attacker)
    ctrl.attacker ? location.search('attacker', ctrl.attacker.id) : null
  })
  scope.$watch('$ctrl.level', () => {
    onSelectedLevel(ctrl.level)    
    location.search('level', ctrl.level)
  })
  scope.$watch('$ctrl.defender', () => {
    onSelectedDefender(ctrl.defender)
    ctrl.defender ? location.search('defender', ctrl.defender.id) : null
  })
  scope.$watch('$ctrl.move', () => {
    onSelectedMove(ctrl.move)
    location.search('move', ctrl.move.id)
  })
  scope.$watch('$ctrl.weatherBoost', () => {
    location.search('weatherBoost', ctrl.weatherBoost)
  })

  if (routeParams.attacker) {
    ctrl.attacker = Pokemons[routeParams.attacker] || null
    onSelectedAttacker(ctrl.attacker)
  }
  if (routeParams.move) {
    ctrl.move = Moves[routeParams.move] || null
    onSelectedMove(ctrl.move)
  }
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
  name: 'mainView',
  config: {
    template: require('./mainView.component.html'),
    controller: MainViewController
  }
}
