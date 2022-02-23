import getLocations from './getLocations'
import getHouses from './getHouses'
import getHouseFlats from './getHouseFlats'
import Clients from './Clients'

const allActions = {
  getLocations,
  getHouses,
  getHouseFlats,
  ...Clients
}

export default allActions