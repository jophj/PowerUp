PokemonMoveForm.$inject = ['$scope', 'Pokemons', 'Moves', 'ObjectToArray']

function PokemonMoveForm(scope, Pokemons, Moves, ObjectToArray) {
  const ctrl = this

  const pokemons = ObjectToArray(Pokemons)

  ctrl.searchTextChange = function(searchText) {
    ctrl.filteredPokemons = pokemons.filter(
      p => p.name.toLowerCase().startsWith(searchText.toLowerCase())
    )
  }
  function onSelectedPokemonChange(selectedPokemon) {
    console.log(selectedPokemon)
    ctrl.pokemonMoves =
      selectedPokemon.quickMoves
        .concat(selectedPokemon.cinematicMoves)
        .map(m => Moves[m])
  }
  ctrl.onSelectedMoveChange = function(selectedMove) {
    ctrl.onSelectedMove({move: selectedMove})
  }

  scope.$watch('$ctrl.pokemon', onSelectedPokemonChange)
  scope.$watch('$ctrl.move', ctrl.onSelectedMoveChange)
}

export default {
  name: 'pokemonMoveForm',
  config: {
    template: require('./pokemonMoveForm.component.html'),
    controller: PokemonMoveForm,
    bindings: {
      onSelectedMove: '&',
      pokemon: '=',
      move: '='
    }
  }
}
