const initState = {
  isLoading: false,
  items: []
}

const houseFlatsReduser = (state = initState, action) => {
  switch (action.type) {
    case 'houseFlats/set.is.loading':
      return { ...state, isLoading: action.data }
    case 'houseFlats/set.items':
      return { ...state, items: action.data }
    default:
      return state
  }
}

export default houseFlatsReduser