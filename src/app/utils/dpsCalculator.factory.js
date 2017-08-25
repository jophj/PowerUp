function dpsCalculator(damage, durationMs) {
  return damage / (durationMs / 1000)
}

function dpsCalculatorFactory() {
  return dpsCalculator
}

export default {
  name: 'dpsCalculator',
  service: dpsCalculatorFactory
}
