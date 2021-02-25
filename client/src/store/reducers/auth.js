import * as actionsType from '../actions/actionsType';

const initialState = {
    token:null,

}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionsType.AUTH_SUCCESS:
            return{
                token:action.payload.token
            }   
        case actionsType.AUTH_LOGOUT:
            return{
                token:null
            }
        default:
            return state;    
    }
}


export default reducer;