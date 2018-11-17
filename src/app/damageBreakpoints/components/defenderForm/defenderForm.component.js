DefenderForm.$inject = ['Pokemons', 'CpM', 'ObjectToArray']

function DefenderForm(Pokemons, CpM, ObjectToArray) {
  const ctrl = this

  const pokemons = ObjectToArray(Pokemons)
  ctrl.raidTiers = CpM.bossCpMultiplier

  ctrl.defenderLevels = []
  for(let i = 1; i < 41; i += 1) {
    ctrl.defenderLevels.push(i)
  }

  ctrl.searchTextChange = function(searchText) {
    ctrl.filteredPokemons = pokemons.filter(
      p => p.name.toLowerCase().includes(searchText.toLowerCase())
    )
  }
}

export default {
  name: 'defenderForm',
  config: {
    template: require('./defenderForm.component.html'),
    controller: DefenderForm,
    bindings: {
      pokemon: '=',
      level: "="
    }
  }
}
