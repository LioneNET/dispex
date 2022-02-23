import useApi from "../../hooks/useApi"
import clientsTypes from "../actionTypes/clientsTypes"

const loadingStart = () => ({ type: clientsTypes.loading, data: true })
const loadingEnd = () => ({ type: clientsTypes.loading, data: false })
const setClients = data => dispatch => dispatch({ type: clientsTypes.items, data })
const setError = data => ({ type: clientsTypes.error, data })

const getClients = id => async dispatch => {
  const $api = useApi()
  dispatch(loadingStart())
  dispatch(setError(false))
  try {
    const response = await $api.get(`HousingStock/clients?addressId=${id}`)
    dispatch(setClients(response.data === "" ? [] : response.data))
  } catch {
    dispatch(setError('Невозможно отвязать клиента'))
  } finally {
    dispatch(loadingEnd())
  }
}

const unbindClient = id => async dispatch => {
  const $api = useApi()
  dispatch(loadingStart())
  dispatch(setError(false))
  try {
    await $api.delete(`HousingStock/bind_client/${id}`)
  } catch {
    dispatch(setError('Ошибка загрузки клиентов'))
  } finally {
    dispatch(loadingEnd())
  }
}

export default {
  getClients,
  unbindClient,
  setClients
}