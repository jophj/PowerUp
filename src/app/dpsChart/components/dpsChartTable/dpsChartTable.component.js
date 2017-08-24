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

  function computeRanking() {

  }

  scope.$watch('$ctrl.pokemon', computeRanking)
  scope.$watch('$ctrl.defenseCpm', computeRanking)
}

export default {
  name: 'dpsChartTable',
  config: {
    template: require('./dpsChartTable.component.html'),
    controller: DpsChartTable,
    bindings: {
      defenseCpm: '<',
      pokemon: '<'
    }
  }
}
