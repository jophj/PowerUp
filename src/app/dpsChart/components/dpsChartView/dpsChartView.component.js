DpsChartViewController.$inject = ['$scope', '$location', '$routeParams','Moves', 'Pokemons', 'CpM', 'Effectiveness']
function DpsChartViewController(scope, location, routeParams, Moves, Pokemons, CpM, Effectiveness) {
  
}

export default {
  name: 'dpsChartView',
  config: {
    template: require('./dpsChartView.component.html'),
    controller: DpsChartViewController
  }
}
