const initState = {
  isLoading: false,
  items: []
}

const locationsReduser = (state = initState, action) => {
  switch (action.type) {
    case 'locations/set.is.loading':
      return { ...state, isLoading: action.data }
    case 'locations/set.items':
      return { ...state, items: action.data }
    default:
      return state
  }
}

export default locationsReduser