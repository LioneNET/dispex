import useApi from "../../hooks/useApi"
import houseFlatsTypes from "../actionTypes/houseFlatsTypes"

const loadingStart = () => ({ type: houseFlatsTypes.loading, data: true })
const loadingEnd = () => ({ type: houseFlatsTypes.loading, data: false })
const setHouseFlats = data => ({ type: houseFlatsTypes.items, data })
const setError = data => ({ type: houseFlatsTypes.error, data })

const getHouseFlats = id => async dispatch => {
  const $api = useApi()
  dispatch(loadingStart())
  dispatch(setError(false))
  try {
    const response = await $api.get(`Request/house_flats/${id}`)
    dispatch(setHouseFlats(response.data))
  } catch {
    dispatch(setError('Ошибка загрузки квартир'))
  } finally {
    dispatch(loadingEnd())
  }
}

export default getHouseFlats