MainViewController.$inject = ['$scope', '$location', '$routeParams','Moves', 'Pokemons', 'CpM', 'Effectiveness']
function MainViewController(scope, location, routeParams, Moves, Pokemons, CpM, Effectiveness) {
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
    if (attacker) {
      ctrl.stab = move.type === attacker.type || move.type === attacker.type2 ? 1.2 : 1
    }
    ctrl.effectiveness = computeEffectiveness(m, ctrl.defender, Effectiveness)
  }
  function onSelectedDefender(p) {
    if (!p) return
    ctrl.baseDefense = p.stats.baseDefense
    ctrl.effectiveness = computeEffectiveness(move, ctrl.defender, Effectiveness)
  }

  function onSelectedLevel(level) {
    // level could be raid tier (T1, T2, ...) or pokemon level
    if (level && level.startsWith('T')) {
      const raidTier = parseInt(level.slice(1))
      ctrl.defenseCpm = CpM.bossCpMultiplier[raidTier - 1]
    }
    else {
      ctrl.defenseCpm = level ? CpM.cpMultiplier[p.level] : CpM.cpMultiplier[38]
    }
  }

  scope.$watch('$ctrl.attacker', () => location.search('attacker', ctrl.attacker.id))
  scope.$watch('$ctrl.level', () => location.search('level', ctrl.level))
  scope.$watch('$ctrl.defender', () => location.search('defender', ctrl.defender.id))
  scope.$watch('$ctrl.move', () => location.search('move', ctrl.move.id))

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

function computeEffectiveness(move, defender, effectiveness) {
  let e = 1
  if (defender && move) {
    e = effectiveness[move.type][defender.type]
    if (defender.type2) {
      e *= effectiveness[move.type][defender.type2]
    }
  }
  return e
}

export default {
  name: 'mainView',
  config: {
    template: require('./mainView.component.html'),
    controller: MainViewController
  }
}
