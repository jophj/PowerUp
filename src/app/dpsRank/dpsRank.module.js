import ngMaterial from 'angular-material'
import ngRoute from 'angular-route'
import PokemonRankElement from 'app/dpsRank/components/pokemonRankElement/pokemonRankElement.component'
import DpsRankView from 'app/dpsRank/components/dpsRankView/dpsRankView.component'
import DpsRankTable from 'app/dpsRank/components/dpsRankTable/dpsRankTable.component'

export default angular
.module('powerUp.damageBreakpoints', [ngMaterial, ngRoute])
.component(PokemonRankElement.name, PokemonRankElement.config)
.component(DpsRankView.name, DpsRankView.config)
.component(DpsRankTable.name, DpsRankTable.config)
.name
