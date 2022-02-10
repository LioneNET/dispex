import axios from 'axios';
import types from './ActionCreatorTypes';


const ClientActionCreator = {
    setIsLoadingClient: (payload)=>({type: types.SET_IS_LOADING_CLIENT, payload}),
    setClient: (payload) => ({type: types.SET_CLIENT, payload}),
    setIsLoadingClients: (payload)=>({type: types.SET_IS_LOADING_CLIENTS, payload}),
    setClients: (payload) => ({type: types.SET_CLIENTS, payload}),

    bindClientToFlat: data=> async dispatch => {
        dispatch(ClientActionCreator.setIsLoadingClient(true))
        await axios.post('https://dispex.org/api/vtest/HousingStock/client',{...data})
        .then(resp=>{
            console.log(resp)
        })
        .catch(er=>console.error(er))
        .finally(()=>dispatch(ClientActionCreator.setIsLoadingClient(false)))
    },

    unbindClientToFlat: data=> async dispatch => {
        dispatch(ClientActionCreator.setIsLoadingClient(true))
        await axios.post('https://dispex.org/api/vtest/HousingStock/client',{...data})
        .then(resp=>{
            console.log(resp)
        })
        .catch(er=>console.error(er))
        .finally(()=>dispatch(ClientActionCreator.setIsLoadingClient(false)))
    },

    getClients: addressId=> async dispatch=> {
        dispatch(ClientActionCreator.setIsLoadingClients(true))
        await axios.get('https://dispex.org/api/vtest/HousingStock/clients?addressId='+addressId)
        .then(resp=>{
            if(resp.data === "") {
                console.log('пусто')
            } else {
                dispatch(ClientActionCreator.setClients(resp.data))
            }
        })
        .catch(er=>console.error(er))
        .finally(()=>dispatch(ClientActionCreator.setIsLoadingClients(false)))
    }
}

export default ClientActionCreator