import ngMaterial from 'angular-material'
import ngRoute from 'angular-route'
import DpsChartView from 'app/dpsChart/components/dpsChartView/dpsChartView.component'
import DpsChartTable from 'app/dpsChart/components/dpsChartTable/dpsChartTable.component'

export default angular
.module('powerUp.dpsChart', [ngMaterial, ngRoute])
.config(['$routeProvider', function(routeProvider) {
  routeProvider.when('/dps-chart', {
    template: '<dps-chart-view></dps-chart-view>'
  })
}])
.component(DpsChartView.name, DpsChartView.config)
.component(DpsChartTable.name, DpsChartTable.config)
.name
