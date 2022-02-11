import useApi from "../../hooks/useApi"

const loadingStart = () => ({ type: 'houses/set.is.loading', data: true })
const loadingEnd = () => ({ type: 'houses/set.is.loading', data: false })
const setHouses = data => ({ type: 'houses/set.items', data })

const getHouses = id => dispatch => {
  dispatch(loadingStart())
  const $api = useApi()
  $api.get(`Request/houses/${id}`)
    .then(resp => {
      dispatch(setHouses(resp.data))
    })
    .finally(() => dispatch(loadingEnd()))
}

export default getHouses