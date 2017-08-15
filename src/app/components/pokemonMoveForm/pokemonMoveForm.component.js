function PokemonMoveForm() {
  const ctrl = this
}

export default {
  name: 'pokemonMoveForm',
  config: {
    template: require('./pokemonMoveForm.component.html'),
    controller: PokemonMoveForm,
    bindings: {
      problem: '<',
    }
  }
}
