PokemonMoveForm.$inject = ['Pokemons']
function PokemonMoveForm(Pokemons) {
  const ctrl = this

  ctrl.pokemons = Pokemons
  ctrl.searchTextChange = function(searchText) {
    ctrl.filteredPokemons = Pokemons.filter(
      p => p.name.toLowerCase().startsWith(searchText.toLowerCase())
    )
  }
  ctrl.onSelectedPokemonChange = function(selectedPokemon) {
    ctrl.pokemonMoves = [{name: 'Rock Throw'}]
    ctrl.onSelectedPokemon({pokemon: selectedPokemon})
  }
  ctrl.onSelectedMoveChange = function(selectedMove) {
    ctrl.onSelectedMove({move: selectedMove})
  }
}

export default {
  name: 'pokemonMoveForm',
  config: {
    template: require('./pokemonMoveForm.component.html'),
    controller: PokemonMoveForm,
    bindings: {
      label: '<',
      onSelectedPokemon: '&',
      onSelectedMove: '&'
    }
  }
}
