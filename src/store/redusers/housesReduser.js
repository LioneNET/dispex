import housesTypes from "../actionTypes/housesTypes"

const initState = {
  isLoading: false,
  items: [],
  error: false
}

const housesReduser = (state = initState, action) => {
  switch (action.type) {
    case housesTypes.loading:
      return { ...state, isLoading: action.data }
    case housesTypes.items:
      return { ...state, items: action.data }
    case housesTypes.error:
      return { ...state, error: action.data }
    default:
      return state
  }
}

export default housesReduser