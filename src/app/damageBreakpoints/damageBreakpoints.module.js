import ngMaterial from 'angular-material'
import ngRoute from 'angular-route'
import MainView from 'app/damageBreakpoints/components/mainView/mainView.component'
import PokemonMoveForm from 'app/damageBreakpoints/components/pokemonMoveForm/pokemonMoveForm.component'
import DefenderForm from 'app/damageBreakpoints/components/defenderForm/defenderForm.component'
import DamageTable from 'app/damageBreakpoints/components/damageTable/damageTable.component'

export default angular
.module('powerUp.dpsRank', [ngMaterial, ngRoute])
.config(['$routeProvider', function(routeProvider) {
  routeProvider.when('/dps-rank', {
    template: '<dps-rank-view></dps-rank-view>',
    reloadOnSearch: false
  })
}])
.component(MainView.name, MainView.config)
.component(PokemonMoveForm.name, PokemonMoveForm.config)
.component(DefenderForm.name, DefenderForm.config)
.component(DamageTable.name, DamageTable.config)
.name
