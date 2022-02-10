import types from './ActionCreatorTypes'

const initialState = {
    locationItems: [],
    houses: [],
    house_flats: [],

    isLoadingLocations: false,
    isLoadingHouses: false,
    isLoadingHouseFlat: false
}

const locations = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_IS_LOADING_LOCATIONS:
            return { ...state, isLoadingLocations: action.payload }
        case types.SET_IS_LOADING_HOUSES:
            return { ...state, isLoadingHouses: action.payload }
        case types.SET_IS_LOADING_HOUSE_FLATS:
            return { ...state, isLoadingHouseFlat: action.payload }
        case types.SET_LOCATION_ITEMS:
            return { ...state, locationItems: action.payload }
        case types.SET_HOUSE_ITEMS:
            return { ...state, houses: action.payload }
        case types.SET_HOUSE_FLAT_ITEMS:
            return { ...state, house_flats: action.payload }
        default:
            return state
    }
}

export default locations