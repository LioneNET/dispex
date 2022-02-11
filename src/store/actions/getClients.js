import useApi from "../../hooks/useApi"

const loadingStart = () => ({ type: 'clients/set.is.loading', data: true })
const loadingEnd = () => ({ type: 'clients/set.is.loading', data: false })
const setClients = data => ({ type: 'clients/set.items', data })

const getClients = id => dispatch => {
  dispatch(loadingStart())
  const $api = useApi()
  $api.get(`HousingStock/clients?addressId=${id}`)
    .then(resp => {
      dispatch(setClients(resp.data === "" ? [] : resp.data))
    })
    .finally(() => dispatch(loadingEnd()))
}

export default getClients