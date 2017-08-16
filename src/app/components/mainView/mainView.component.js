MainViewController.$inject = ['CpM', 'Effectiveness']
function MainViewController(CpM, Effectiveness) {
  const ctrl = this
  // base-attack="$ctrl.baseAttack"
  // power="$ctrl.power"
  // base-defense="$ctrl.baseDefense"
  // defense-cpm="$ctrl.defenseCpm"
  // stab="$ctrl.stab"
  // effectiveness="$ctrl.effectiveness"
  let attacker = null
  let defender = null
  let move = null
  ctrl.onSelectedAttacker = (p) => {
    attacker = p
    ctrl.baseAttack = p.stats.baseAttack
  }
  ctrl.onSelectedMove = (m) => {
    move = m
    ctrl.power = m.power
    ctrl.stab = m.type === attacker.type || m.type === attacker.type2 ? 1.2 : 1
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
  if (defender) {
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
