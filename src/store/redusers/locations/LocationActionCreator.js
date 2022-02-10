import axios from 'axios';
import types from './ActionCreatorTypes';


const LocationActionCreator = {
    setIsLoadingLocations: (payload)=>({type: types.SET_IS_LOADING_LOCATIONS, payload}),
    setLocationItems: (payload) => ({type: types.SET_LOCATION_ITEMS, payload}),
    setIsLoadingHouses: (payload)=>({type: types.SET_IS_LOADING_HOUSES, payload}),
    setHoueItems: (payload) => ({type: types.SET_HOUSE_ITEMS, payload}),
    setIsLoadingHouesFlats: (payload)=>({type: types.SET_IS_LOADING_HOUSE_FLATS, payload}),
    setHouseFlatItems: (payload) => ({type: types.SET_HOUSE_FLAT_ITEMS, payload}),

    getLocations: ()=> async dispatch=> {
        dispatch(LocationActionCreator.setIsLoadingLocations(true))
        await axios.get('https://dispex.org/api/vtest/Request/streets')
        .then(resp=>{
            dispatch(LocationActionCreator.setLocationItems(resp.data))
        })
        .catch(err=>console.log(err))
        .finally(()=>dispatch(LocationActionCreator.setIsLoadingLocations(false)))
    },
    getHouses: id=> async dispatch=> {
        dispatch(LocationActionCreator.setIsLoadingHouses(true))
        await axios.get('https://dispex.org/api/vtest/Request/houses/'+id)
        .then(resp=>{
            dispatch(LocationActionCreator.setHoueItems(resp.data))
        })
        .catch(err=>console.log(err))
        .finally(()=>dispatch(LocationActionCreator.setIsLoadingHouses(false)))
    },
    getHouseFlats: id=> async dispatch=> {
        dispatch(LocationActionCreator.setIsLoadingHouesFlats(true))
        await axios.get('https://dispex.org/api/vtest/Request/house_flats/'+id)
        .then(resp=>{
            dispatch(LocationActionCreator.setHouseFlatItems(resp.data))
        })
        .catch(err=>console.log(err))
        .finally(()=>dispatch(LocationActionCreator.setIsLoadingHouesFlats(false)))
    }
}

export default LocationActionCreator