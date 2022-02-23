import useApi from "../../hooks/useApi"
import locationTypes from "../actionTypes/locationTypes"
const loadingStart = () => ({ type: locationTypes.loading, data: true })
const loadingEnd = () => ({ type: locationTypes.loading, data: false })
const setLocations = data => ({ type: locationTypes.items, data })
const setError = data => ({ type: locationTypes.error, data })

const getLocations = () => async dispatch => {
  const $api = useApi()
  dispatch(loadingStart())
  dispatch(setError(false))
  try {
    const response = await $api.get('Request/streets')
    dispatch(setLocations(response.data))
  } catch {
    dispatch(setError('Ошибка загрузки улиц'))
  } finally {
    dispatch(loadingEnd())
  }
}

export default getLocations