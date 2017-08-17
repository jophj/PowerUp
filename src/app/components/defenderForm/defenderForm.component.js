DefenderForm.$inject = ['Pokemons', 'CpM', 'ObjectToArray']

function DefenderForm(Pokemons, CpM, ObjectToArray) {
  const ctrl = this

  const pokemons = ObjectToArray(Pokemons)
  ctrl.raidTiers = CpM.bossCpMultiplier

  ctrl.searchTextChange = function(searchText) {
    ctrl.filteredPokemons = pokemons.filter(
      p => p.name.toLowerCase().startsWith(searchText.toLowerCase())
    )
  }
  ctrl.onSelectedPokemonChange = function(selectedPokemon) {
    selectedPokemon.level = ctrl.level
    ctrl.onSelectedPokemon({pokemon: selectedPokemon})
  }
  ctrl.onSelectedLevelChange = function(selectedLevel) {
    if (ctrl.pokemon) {
      ctrl.pokemon.level = selectedLevel
      ctrl.onSelectedPokemon({pokemon: ctrl.pokemon})
    }
  }
}

export default {
  name: 'defenderForm',
  config: {
    template: require('./defenderForm.component.html'),
    controller: DefenderForm,
    bindings: {
      onSelectedPokemon: '&',
      pokemon: '=',
      level: "="
    }
  }
}
