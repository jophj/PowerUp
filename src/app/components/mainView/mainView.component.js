MainViewController.$inject = ['CpM', 'Effectiveness']
function MainViewController(CpM, Effectiveness) {
  const ctrl = this
  let attacker = null
  let defender = null
  let move = null

  ctrl.onSelectedAttacker = (p) => {
    attacker = p
    ctrl.baseAttack = p.stats.baseAttack
    if (move) {
      ctrl.stab = move.type === attacker.type || move.type === attacker.type2 ? 1.2 : 1
    }
  }
  ctrl.onSelectedMove = (m) => {
    move = m
    ctrl.power = m.power
    if (attacker) {
      ctrl.stab = move.type === attacker.type || move.type === attacker.type2 ? 1.2 : 1
    }
    ctrl.effectiveness = computeEffectiveness(m, defender, Effectiveness)
  }
  ctrl.onSelectedDefender = (p) => {
    defender = p
    ctrl.baseDefense = p.stats.baseDefense
    ctrl.defenseCpm = p.raidTier ? CpM.bossCpMultiplier[p.raidTier - 1] : CpM.cpMultiplier[38]
    ctrl.effectiveness = computeEffectiveness(move, defender, Effectiveness)
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
