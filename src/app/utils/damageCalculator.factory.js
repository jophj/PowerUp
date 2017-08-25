function damageCalculator(baseAttack, iv, power, attackCpm, baseDefense, defenseCpm, stab, effectiveness) {
  return Math.floor(
    .5 *
    power *
    ((baseAttack+iv) * attackCpm)/((baseDefense + 15) * defenseCpm) *
    stab *
    effectiveness
  ) + 1
}

function damageCalculatorFactory() {
  return damageCalculator
}

export default {
  name: 'damageCalculator',
  service: damageCalculatorFactory
}
