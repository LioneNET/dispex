import clientsTypes from "../actionTypes/clientsTypes"

const initState = {
    isLoading: false,
    items: [],
    error: false
  }
  
  const clientsReduser = (state = initState, action) => {
    switch (action.type) {
      case clientsTypes.loading:
        return { ...state, isLoading: action.data }
      case clientsTypes.items:
        return { ...state, items: action.data }
      case clientsTypes.error:
        return { ...state, error: action.data }
      default:
        return state
    }
  }
  
  export default clientsReduser