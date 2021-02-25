import * as actionsType from './actionsType';
export const onSuccess = (token) =>{
    return{
        type:actionsType.AUTH_SUCCESS,
        payload:{
            token
        }
    }
}

export const onLogout = () =>{
    return{
        type:actionsType.AUTH_LOGOUT
    }
}