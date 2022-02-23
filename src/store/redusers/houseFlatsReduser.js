import houseFlatsTypes from "../actionTypes/houseFlatsTypes"

const initState = {
  isLoading: false,
  items: [],
  error: false
}

const houseFlatsReduser = (state = initState, action) => {
  switch (action.type) {
    case houseFlatsTypes.loading:
      return { ...state, isLoading: action.data }
    case houseFlatsTypes.items:
      return { ...state, items: action.data }
    case houseFlatsTypes.error:
      return { ...state, error: action.data }
    default:
      return state
  }
}

export default houseFlatsReduser