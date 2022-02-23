import locationTypes from "../actionTypes/locationTypes"

const initState = {
  isLoading: false,
  items: [],
  error: false
}

const locationsReduser = (state = initState, action) => {
  switch (action.type) {
    case locationTypes.loading:
      return { ...state, isLoading: action.data }
    case locationTypes.items:
      return { ...state, items: action.data }
    case locationTypes.error:
      return { ...state, error: action.data }
    default:
      return state
  }
}

export default locationsReduser