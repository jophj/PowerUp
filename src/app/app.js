import angular from 'angular'
import 'angular-animate'
import 'angular-aria'
import ngMaterial from 'angular-material'
import 'angular-material/angular-material.css'
import ngRoute from 'angular-route'

import App from 'app/components/app.component'

import Pokemons from 'app/utils/pokemons.factory'
import CpM from 'app/utils/cpM.factory'
import Effectiveness from 'app/utils/effectiveness.factory'
import damageCalculator from 'app/utils/damageCalculator.factory'
import dpsCalculator from 'app/utils/dpsCalculator.factory'
import effectivenessCalculator from 'app/utils/effectivenessCalculator.factory'
import Moves from 'app/utils/moves.factory'
import ObjectToArray from 'app/utils/objectToArray.factory'

import DamageBreakpointsModule from 'app/damageBreakpoints/damageBreakpoints.module'
import DpsRankModule from 'app/dpsRank/dpsRank.module'

export default angular
  .module('powerUp', [ngMaterial, ngRoute, DamageBreakpointsModule, DpsRankModule])
  .config(['$routeProvider', function(routeProvider) {
    routeProvider.otherwise('/')
    routeProvider.when('/', {
      template: '<main-view></main-view>',
      reloadOnSearch: false
    })
    .when('/dps-rank', {
      template: '<dps-rank-view></dps-rank-view>',
      reloadOnSearch: false
    })
  }])
  .component(App.name, App.config)
  .factory(Pokemons.name, Pokemons.service)
  .factory(Moves.name, Moves.service)
  .factory(CpM.name, CpM.service)
  .factory(Effectiveness.name, Effectiveness.service)
  .factory(damageCalculator.name, damageCalculator.service)
  .factory(dpsCalculator.name, dpsCalculator.service)
  .factory(effectivenessCalculator.name, effectivenessCalculator.service)
  .factory(ObjectToArray.name, ObjectToArray.service)
  .name
