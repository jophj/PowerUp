DpsChartTable.$inject = ['$scope', 'CpM', 'damageCalculator', 'dpsCalculator']
function DpsChartTable(scope, CpM, damageCalculator, dpsCalculator) {
  const ctrl = this

  ctrl.damageCalculator = damageCalculator
  ctrl.dpsCalculator = dpsCalculator
  ctrl.floor = Math.floor
  ctrl.cpM = {}
  CpM.cpMultiplier.forEach((cpm, i) => {
    ctrl.cpM[i+1] = cpm
    if (i < 39) {
      ctrl.cpM[(i+1)+'.5'] = Math.sqrt((cpm*cpm + CpM.cpMultiplier[i+1]*CpM.cpMultiplier[i+1])/2)
    }
  })

  function computeMinMaxDamage() {
    ctrl.minDamage = damageCalculator(
      ctrl.baseAttack,
      0,
      ctrl.power,
      ctrl.cpM[20],
      ctrl.baseDefense,
      ctrl.defenseCpm,
      ctrl.stab,
      ctrl.effectiveness
    )
    ctrl.maxDamage = damageCalculator(
      ctrl.baseAttack,
      15,
      ctrl.power,
      ctrl.cpM[40],
      ctrl.baseDefense,
      ctrl.defenseCpm,
      ctrl.stab,
      ctrl.effectiveness
    )
  }

  scope.$watch('$ctrl.durationMs', computeMinMaxDamage)
  scope.$watch('$ctrl.power', computeMinMaxDamage)
  scope.$watch('$ctrl.baseAttack', computeMinMaxDamage)
  scope.$watch('$ctrl.baseDefense', computeMinMaxDamage)
  scope.$watch('$ctrl.defenseCpm', computeMinMaxDamage)
  scope.$watch('$ctrl.stab', computeMinMaxDamage)
  scope.$watch('$ctrl.effectiveness', computeMinMaxDamage)
}

export default {
  name: 'dpsChartTable',
  config: {
    template: require('./dpsChartTable.component.html'),
    controller: DpsChartTable,
    bindings: {
      baseAttack: '<',
      power: '<',
      baseDefense: '<',
      defenseCpm: '<',
      stab: '<',
      effectiveness: '<',
      durationMs: '<'
    }
  }
}
