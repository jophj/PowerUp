function MainViewController() {
  const ctrl = this
  ctrl.onSelectedPokemon = (p) => console.log(p)
  ctrl.onSelectedMove = (m) => console.log(m)
}

export default {
  name: 'mainView',
  config: {
    template: require('./mainView.component.html'),
    controller: MainViewController
  }
}
