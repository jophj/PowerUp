import './pokemonRankElement.component.css'

PokemonRankElement.$inject = ['$scope', '$location', '$routeParams', 'Pokemons', 'CpM']
function PokemonRankElement(scope, location, routeParams, Pokemons, CpM) {
  
}

export default {
  name: 'pokemonRankElement',
  config: {
    template: require('./pokemonRankElement.component.html'),
    controller: PokemonRankElement,
    bindings: {
      rankData: '<',
      rank: '<'
    }
  }
}
