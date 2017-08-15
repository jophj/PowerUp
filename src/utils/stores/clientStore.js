import Store from 'utils/stores/store'

ClientStore.$inject = [Store.name]
function ClientStore(Store) {
  function initStore(store) {
    store.data = [{
      name: 'Giovanni',
      surname: 'Pinto',
      placeOfBirth: {
        name: "Castellammare di Stabia",
        codiceCatastale: "C129",
        provincia: "NA"
      },
      city: {
        name: "Prato",
        codiceCatastale: "C999",
        provincia: "PO"
      },
      sex: "M",
      birthDate: new Date("09/09/1990"),
      // codiceFiscale: "PNTGNN90R09C129O",
      address: "Via Michelozzo, 12",
      email: "giovanni.pinto.po@gmail.com",
      phone1: "3921330713",
    }]
    store.current = store.data[0]
    store.initialized = true
  }

  const store = Store('client')
  if (!store.initialized) {
    initStore(store)
  }
  return store
}

export default {
  name: 'ClientStore',
  service: ClientStore
}