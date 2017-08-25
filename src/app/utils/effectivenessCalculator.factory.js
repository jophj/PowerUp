effectivenessCalculatorFactory.$inject = ['Effectiveness']
function effectivenessCalculatorFactory(Effectiveness) {
  return function effectivenessCalculator(moveType, defenderType, defenderType2) {
    let e = 1
    if ((defenderType || defenderType2) && moveType) {
      e = Effectiveness[moveType][defenderType]
      if (defenderType2) {
        e *= Effectiveness[moveType][defenderType2]
      }
    }
    return e
  }
}

export default {
  name: 'effectivenessCalculator',
  service: effectivenessCalculatorFactory
}
