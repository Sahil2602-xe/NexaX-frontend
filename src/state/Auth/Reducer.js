import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, 
    LOGIN_REQUEST, GET_USER_REQUEST, LOGIN_FAILURE, GET_USER_FAILURE, 
    LOGIN_SUCCESS, GET_USER_SUCCESS, 
    LOGOUT,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE} from "./ActionType";

const initialState = {
    user:null,
    loading:false,
    error:null,
    jwt:null
}

const authReducer = (state = initialState,action) => {
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:

            return{...state, loading:true, error:null}
        
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return{...state, loading:false, error:null, jwt:action.payload}

        case GET_USER_SUCCESS:
            return{...state, user:action.payload, loading:false, error:null}

        case UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true };

        case UPDATE_PROFILE_SUCCESS:
            return { ...state, loading: false, user: action.payload };

        case UPDATE_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };


        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return{...state, loading:false, error:action.payload}

        case LOGOUT:{
            return initialState
        }
        
        default:
            return state;
    }
    
}

export default authReducer;