import types from './ActionCreatorTypes';
const initialState = {
    isClientLoading: false,
    isClientsLoading: false,
    clientItems: [],
}
const HousingStock = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_IS_LOADING_CLIENT:
            return { ...state, isClientLoading: action.payload }
        case types.SET_IS_LOADING_CLIENTS:
            return { ...state, isClientsLoading: action.payload }
        case types.SET_CLIENTS:
            return { ...state, clientItems: action.payload }
        default:
            return state
    }
}

export default HousingStock