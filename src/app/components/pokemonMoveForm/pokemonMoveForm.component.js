PokemonMoveForm.$inject = ['$scope', 'Pokemons', 'Moves', 'ObjectToArray']

function PokemonMoveForm(scope, Pokemons, Moves, ObjectToArray) {
  const ctrl = this

  const pokemons = ObjectToArray(Pokemons)

  ctrl.searchTextChange = function(searchText) {
    ctrl.filteredPokemons = pokemons.filter(
      p => p.name.toLowerCase().startsWith(searchText.toLowerCase())
    )
  }
  ctrl.onSelectedPokemonChange = function(selectedPokemon) {
    ctrl.pokemonMoves =
      selectedPokemon.quickMoves.concat(selectedPokemon.cinematicMoves)
      .map(m => Moves[m])
    ctrl.onSelectedPokemon({pokemon: selectedPokemon})
  }
  ctrl.onSelectedMoveChange = function(selectedMove) {
    ctrl.onSelectedMove({move: selectedMove})
  }

  scope.$watch('$ctrl.pokemon', ctrl.onSelectedPokemonChange)
  scope.$watch('$ctrl.move', ctrl.onSelectedMoveChange)
}

export default {
  name: 'pokemonMoveForm',
  config: {
    template: require('./pokemonMoveForm.component.html'),
    controller: PokemonMoveForm,
    bindings: {
      onSelectedPokemon: '&',
      onSelectedMove: '&',
      pokemon: '=',
      move: '='
    }
  }
}
