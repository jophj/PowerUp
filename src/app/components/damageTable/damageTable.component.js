function DamageTable() {
  const ctrl = this
  ctrl.floor = Math.floor
}

export default {
  name: 'damageTable',
  config: {
    template: require('./damageTable.component.html'),
    controller: DamageTable,
    bindings: {
      problem: '<',
    }
  }
}
