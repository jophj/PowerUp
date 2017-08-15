function MainViewController() {
  const ctrl = this
  ctrl.floor = Math.floor
}

export default {
  name: 'mainView',
  config: {
    template: require('./mainView.component.html'),
    controller: MainViewController
  }
}
