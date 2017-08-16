PokemonMoveForm.$inject = ['Pokemons']
function PokemonMoveForm(Pokemons) {
  const ctrl = this

  ctrl.pokemons = Pokemons
  ctrl.pokemonMoves = [{name: 'asdasd'}]
  ctrl.searchTextChange = function(searchText) {
    ctrl.filteredPokemons = Pokemons.filter(
      p => p.name.toLowerCase().startsWith(searchText.toLowerCase())
    )
  }
  ctrl.onSelectedPokemonChange = function(selectedPokemon) {
    console.log(selectedPokemon)
    ctrl.pokemonMoves = [{name: 'asdasd'}]
  }
}

export default {
  name: 'pokemonMoveForm',
  config: {
    template: require('./pokemonMoveForm.component.html'),
    controller: PokemonMoveForm,
    bindings: {
      label: '<'
    }
  }
}
