import angular from 'angular'
import 'angular-animate'
import 'angular-aria'
import ngMaterial from 'angular-material'
import 'angular-material/angular-material.css'
import ngRoute from 'angular-route'

import App from 'app/components/app.component'
import MainView from 'app/components/mainView/mainView.component'
import PokemonMoveForm from 'app/components/pokemonMoveForm/pokemonMoveForm.component'
import DefenderForm from 'app/components/defenderForm/defenderForm.component'
import DamageTable from 'app/components/damageTable/damageTable.component'
import Pokemons from 'app/utils/pokemons.factory'
import CpM from 'app/utils/cpM.factory'
import Effectiveness from 'app/utils/effectiveness.factory'
import damageCalculator from 'app/utils/damageCalculator.factory'
import dpsCalculator from 'app/utils/dpsCalculator.factory'
import effectivenessCalculator from 'app/utils/effectivenessCalculator.factory'
import Moves from 'app/utils/moves.factory'
import ObjectToArray from 'app/utils/objectToArray.factory'

import DpsChartModule from 'app/dpsChart/dpsChart.module'

export default angular
  .module('powerUp', [ngMaterial, ngRoute, DpsChartModule])
  .config(['$routeProvider', function(routeProvider) {
    routeProvider.otherwise('/')
    routeProvider.when('/', {
      template: '<main-view></main-view>',
      // reloadOnSearch: false
    })
  }])
  .component(App.name, App.config)
  .component(MainView.name, MainView.config)
  .component(PokemonMoveForm.name, PokemonMoveForm.config)
  .component(DefenderForm.name, DefenderForm.config)
  .component(DamageTable.name, DamageTable.config)
  .factory(Pokemons.name, Pokemons.service)
  .factory(Moves.name, Moves.service)
  .factory(CpM.name, CpM.service)
  .factory(Effectiveness.name, Effectiveness.service)
  .factory(damageCalculator.name, damageCalculator.service)
  .factory(dpsCalculator.name, dpsCalculator.service)
  .factory(effectivenessCalculator.name, effectivenessCalculator.service)
  .factory(ObjectToArray.name, ObjectToArray.service)
  .name
