function ObjectToArray() {
  return function(obj) {
    const arr = []
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        arr.push(obj[prop])
      }
    }
    return arr
  }
}

export default {
  name: 'ObjectToArray',
  service: ObjectToArray
}