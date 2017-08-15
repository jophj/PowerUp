function Store() {
  const store = {}
  return function(storeName) {
    return store[storeName] || {}
  }
}

export default {
  name: 'Store',
  service: Store
}