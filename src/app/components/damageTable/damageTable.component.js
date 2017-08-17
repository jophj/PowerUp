DamageTable.$inject = ['$scope', 'CpM']
function DamageTable($scope, CpM) {
  const ctrl = this
  ctrl.floor = Math.floor
  ctrl.cpM = {}
  CpM.cpMultiplier.forEach((cpm, i) => {
    ctrl.cpM[i+1] = cpm
    if (i < 39) {
      ctrl.cpM[(i+1)+'.5'] = Math.sqrt((cpm*cpm + CpM.cpMultiplier[i+1]*CpM.cpMultiplier[i+1])/2)
    }
  })
  $scope.$watch('$ctrl.power', computeMinMaxDamage)
  $scope.$watch('$ctrl.baseAttack', computeMinMaxDamage)
  $scope.$watch('$ctrl.baseDefense', computeMinMaxDamage)
  $scope.$watch('$ctrl.defenseCpm', computeMinMaxDamage)
  $scope.$watch('$ctrl.stab', computeMinMaxDamage)
  $scope.$watch('$ctrl.effectiveness', computeMinMaxDamage)

  ctrl.computeDamage = function(baseAttack, iv, power, level, baseDefense, defenseCpm, stab, effectiveness) {
    return Math.floor(
      .5 *
      power *
      ((baseAttack+iv) * ctrl.cpM[level])/((baseDefense + 15) * defenseCpm) *
      stab *
      effectiveness
    ) + 1
  }

  function computeMinMaxDamage() {
    ctrl.minDamage = ctrl.computeDamage(
      ctrl.baseAttack,
      0,
      ctrl.power,
      20,
      ctrl.baseDefense,
      ctrl.defenseCpm,
      ctrl.stab,
      ctrl.effectiveness
    )
    ctrl.maxDamage = ctrl.computeDamage(
      ctrl.baseAttack,
      15,
      ctrl.power,
      40,
      ctrl.baseDefense,
      ctrl.defenseCpm,
      ctrl.stab,
      ctrl.effectiveness
    )
  }
}

export default {
  name: 'damageTable',
  config: {
    template: require('./damageTable.component.html'),
    controller: DamageTable,
    bindings: {
      baseAttack: '<',
      power: '<',
      baseDefense: '<',
      defenseCpm: '<',
      stab: '<',
      effectiveness: '<'
    }
  }
}
