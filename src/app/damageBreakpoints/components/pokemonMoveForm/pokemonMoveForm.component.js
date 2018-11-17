PokemonMoveForm.$inject = ['$scope', 'Pokemons', 'Moves', 'ObjectToArray']

function PokemonMoveForm(scope, Pokemons, Moves, ObjectToArray) {
  const ctrl = this

  const pokemons = ObjectToArray(Pokemons)

  ctrl.searchTextChange = function(searchText) {
    ctrl.filteredPokemons = pokemons.filter(
      p => p.name.toLowerCase().includes(searchText.toLowerCase())
    )
  }
  function onSelectedPokemonChange(selectedPokemon) {
    if (!selectedPokemon) return
    ctrl.pokemonMoves =
      selectedPokemon.quickMoves
        .concat(selectedPokemon.cinematicMoves)
        .map(m => Moves[m])
  }

  scope.$watch('$ctrl.pokemon', onSelectedPokemonChange)
}

export default {
  name: 'pokemonMoveForm',
  config: {
    template: require('./pokemonMoveForm.component.html'),
    controller: PokemonMoveForm,
    bindings: {
      pokemon: '=',
      move: '=',
      weatherBoost : '='
    }
  }
}
