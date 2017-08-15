PokemonMoveForm.$inject = ['Pokemons']
function PokemonMoveForm(Pokemons) {
  const ctrl = this

  ctrl.pokemons = Pokemons
  ctrl.searchTextChange = function(searchText) {
    console.log(searchText)
    ctrl.filteredPokemons = Pokemons.filter(
      p => p.name.toLowerCase().startsWith(searchText.toLowerCase())
    )
  }
}

export default {
  name: 'pokemonMoveForm',
  config: {
    template: require('./pokemonMoveForm.component.html'),
    controller: PokemonMoveForm,
    bindings: {
      pokemon: '<',
      move: '<',
      label: '<'
    }
  }
}
