function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);   
}

totalDpsCalculatorFactory.$inject = ['damageCalculator']
function totalDpsCalculatorFactory(damageCalculator) {
  return function totalDpsCalculator(attack, quickMove, cinematicMove, attackCpm, defense, defenseCpm) {
    const energyLcm = lcm(quickMove.energyDelta, cinematicMove.energyDelta * -1)
    const quickIterations = energyLcm / quickMove.energyDelta
    const cinematicIterations = energyLcm / (cinematicMove.energyDelta * -1)
  
    const qTotalDamage = damageCalculator(attack, 0, quickMove.power, attackCpm, defense - 15, defenseCpm, quickMove.stab, quickMove.effectiveness) * quickIterations
    const cTotalDamage = damageCalculator(attack, 0, cinematicMove.power, attackCpm, defense - 15, defenseCpm, cinematicMove.stab, cinematicMove.effectiveness) * cinematicIterations
    const qTotalTime = quickIterations * quickMove.durationMs
    const cTotalTime = cinematicIterations * cinematicMove.durationMs
    return ((qTotalDamage + cTotalDamage) / ((qTotalTime + cTotalTime)/1000))
  }
}

export default {
  name: 'totalDpsCalculator',
  service: totalDpsCalculatorFactory
}
