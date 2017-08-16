function MainViewController() {
  const ctrl = this
  ctrl.onSelectedAttacker = (p) => console.log(p)
  ctrl.onSelectedMove = (m) => console.log(m)
  ctrl.onSelectedDefender = (p) => console.log(p)
  ctrl.baseAttack = 1
}

export default {
  name: 'mainView',
  config: {
    template: require('./mainView.component.html'),
    controller: MainViewController
  }
}
