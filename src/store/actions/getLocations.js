import useApi from "../../hooks/useApi"

const loadingStart = () => ({ type: 'locations/set.is.loading', data: true })
const loadingEnd = () => ({ type: 'locations/set.is.loading', data: false })
const setLocations = data => ({ type: 'locations/set.items', data })

const getLocations = () => dispatch => {
  const $api = useApi()
  dispatch(loadingStart())
  $api.get('Request/streets')
    .then(resp => {
      dispatch(setLocations(resp.data))
    })
    .finally(() => dispatch(loadingEnd()))
}

export default getLocations