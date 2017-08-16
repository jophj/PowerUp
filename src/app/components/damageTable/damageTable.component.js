DamageTable.$inject = ['CpM']
function DamageTable(CpM) {
  const ctrl = this
  ctrl.floor = Math.floor
  ctrl.cpM = {}
  CpM.cpMultiplier.forEach((cpm, i) => {
    ctrl.cpM[i+1] = cpm
    if (i < 39) {
      ctrl.cpM[(i+1)+'.5'] = Math.sqrt((cpm*cpm + CpM.cpMultiplier[i+1]*CpM.cpMultiplier[i+1])/2)
    }
  })
}

export default {
  name: 'damageTable',
  config: {
    template: require('./damageTable.component.html'),
    controller: DamageTable,
    bindings: {
      baseAttack: '<',
      power: '<',
      baseDefense: '<',
      defenseCpm: '<',
      stab: '<',
      effectiveness: '<'
    }
  }
}
