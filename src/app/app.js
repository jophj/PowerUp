import angular from 'angular'
import 'angular-animate'
import 'angular-aria'
import ngMaterial from 'angular-material'
import 'angular-material/angular-material.css'
import ngRoute from 'angular-route'

import App from 'app/components/app.component'
import MainView from 'app/components/mainView/mainView.component'
import PokemonMoveForm from 'app/components/pokemonMoveForm/pokemonMoveForm.component'
import DamageTable from 'app/components/damageTable/damageTable.component'
import Pokemons from 'app/utils/pokemons.factory'
import ObjectToArray from 'app/utils/objectToArray.factory'
export default angular
  .module('powerUp', [ngMaterial, ngRoute])
  .config(['$routeProvider', function(routeProvider) {
    routeProvider.otherwise('/problems')
    routeProvider.when('/problems', {
      template: '<main-view></main-view>',
    })
  }])
  .component(App.name, App.config)
  .component(MainView.name, MainView.config)
  .component(PokemonMoveForm.name, PokemonMoveForm.config)
  .component(DamageTable.name, DamageTable.config)
  .factory(Pokemons.name, Pokemons.service)
  .factory(ObjectToArray.name, ObjectToArray.service)
  .name
