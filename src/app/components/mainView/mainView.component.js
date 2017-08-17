MainViewController.$inject = ['$location', '$routeParams','Moves', 'Pokemons', 'CpM', 'Effectiveness']
function MainViewController(location, routeParams, Moves, Pokemons, CpM, Effectiveness) {
  const ctrl = this
  let attacker = null
  let defender = null
  let move = null

  ctrl.onSelectedAttacker = (p) => {
    if (!p) return
    location.search('attacker', p.id)
    attacker = p
    ctrl.baseAttack = p.stats.baseAttack
    if (move) {
      ctrl.stab = move.type === attacker.type || move.type === attacker.type2 ? 1.2 : 1
    }
  }
  ctrl.onSelectedMove = (m) => {
    if (!m) return
    location.search('move', m.id)
    move = m
    ctrl.power = m.power
    if (attacker) {
      ctrl.stab = move.type === attacker.type || move.type === attacker.type2 ? 1.2 : 1
    }
    ctrl.effectiveness = computeEffectiveness(m, defender, Effectiveness)
  }
  ctrl.onSelectedDefender = (p) => {
    if (!p) return
    location.search('defender', p.id)
    location.search('level', p.level)
    defender = p
    ctrl.baseDefense = p.stats.baseDefense
    // level could be raid tier (T1, T2, ...) or pokemon level
    if (p.level && p.level.startsWith('T')) {
      const raidTier = parseInt(p.level.slice(1))
      ctrl.defenseCpm = CpM.bossCpMultiplier[raidTier - 1]
    }
    else {
      ctrl.defenseCpm = p.level ? CpM.cpMultiplier[p.level] : CpM.cpMultiplier[38]
    }
    ctrl.effectiveness = computeEffectiveness(move, defender, Effectiveness)
  }

  if (routeParams.attacker) {
    ctrl.attacker = Pokemons[routeParams.attacker] || null
    ctrl.onSelectedAttacker(ctrl.attacker)
  }
  if (routeParams.move) {
    ctrl.move = Moves[routeParams.move] || null
    ctrl.onSelectedMove(ctrl.move)
  }
  if (routeParams.defender) {
    ctrl.defender = Pokemons[routeParams.defender] || null
    ctrl.onSelectedDefender(ctrl.defender)
  }
  if (routeParams.level) {
    ctrl.level = routeParams.level || null
    ctrl.onSelectedDefender(ctrl.defender)
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
