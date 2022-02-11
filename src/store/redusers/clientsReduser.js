const initState = {
    isLoading: false,
    items: []
  }
  
  const clientsReduser = (state = initState, action) => {
    switch (action.type) {
      case 'clients/set.is.loading':
        return { ...state, isLoading: action.data }
      case 'clients/set.items':
        return { ...state, items: action.data }
      default:
        return state
    }
  }
  
  export default clientsReduser