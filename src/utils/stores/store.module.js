import Store from 'utils/stores/store'
import ClientStore from 'utils/stores/clientStore'

export default angular
  .module('myVet.store', [])
  .factory(Store.name, Store.service)
  .factory(ClientStore.name, ClientStore.service)
  .name