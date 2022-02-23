import useApi from "../../hooks/useApi"
import housesTypes from "../actionTypes/housesTypes"

const loadingStart = () => ({ type: housesTypes.loading, data: true })
const loadingEnd = () => ({ type: housesTypes.loading, data: false })
const setHouses = data => ({ type: housesTypes.items, data })
const setError = data => ({ type: housesTypes.error, data })

const getHouses = id => async dispatch => {
  const $api = useApi()
  dispatch(loadingStart())
  dispatch(setError(false))
  try {
    const response = await $api.get(`Request/houses/${id}`)
    dispatch(setHouses(response.data))
  } catch {
    dispatch(setError('Ошибка загрузки домов'))
  } finally {
    dispatch(loadingEnd())
  }
}

export default getHouses