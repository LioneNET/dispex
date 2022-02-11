const initState = {
  isLoading: false,
  items: []
}

const housesReduser = (state = initState, action) => {
  switch (action.type) {
    case 'houses/set.is.loading':
      return { ...state, isLoading: action.data }
    case 'houses/set.items':
      return { ...state, items: action.data }
    default:
      return state
  }
}

export default housesReduser