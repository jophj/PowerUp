import ngMaterial from 'angular-material'
import ngRoute from 'angular-route'
import DpsChartView from 'app/dpsChart/components/dpsChartView/dpsChartView.component'

export default angular
.module('powerUp.dpsChart', [ngMaterial, ngRoute])
.config(['$routeProvider', function(routeProvider) {
  routeProvider.when('/dps-chart', {
    template: '<dps-chart-view></dps-chart-view>'
  })
}])
.component(DpsChartView.name, DpsChartView.config)
.name
