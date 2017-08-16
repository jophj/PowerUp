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
    selectedPokemon.raidTier = ctrl.selectedRaidTier
    ctrl.onSelectedPokemon({pokemon: selectedPokemon})
  }
  ctrl.onSelectedRaidTierChange = function(selectedRaidTier) {
    if (ctrl.selectedPokemon) {
      ctrl.selectedPokemon.raidTier = selectedRaidTier
      ctrl.onSelectedPokemon({pokemon: ctrl.selectedPokemon})
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
    }
  }
}
