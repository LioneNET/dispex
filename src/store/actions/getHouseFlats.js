import useApi from "../../hooks/useApi"

const loadingStart = () => ({ type: 'houseFlats/set.is.loading', data: true })
const loadingEnd = () => ({ type: 'houseFlats/set.is.loading', data: false })
const setHouseFlats = data => ({ type: 'houseFlats/set.items', data })

const getHouseFlats = id => dispatch => {
  dispatch(loadingStart())
  const $api = useApi()
  $api.get(`Request/house_flats/${id}`)
    .then(resp => {
      dispatch(setHouseFlats(resp.data))
    })
    .finally(() => dispatch(loadingEnd()))
}

export default getHouseFlats