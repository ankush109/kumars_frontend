import {
  
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, CLEAR_ERRORS,REGISTER_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS,LOADUSER_FAIL,LOADUSER_REQUEST,LOADUSER_SUCCESS,LOGOUT_FAIL,LOGOUT_SUCCESS,UPDATEUSER_FAIL,UPDATEUSER_REQUEST,UPDATEUSER_RESET,UPDATEUSER_SUCCESS


} from "../constants/userconstant"

 
export const allUsersReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const userreducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      case LOADUSER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        case LOADUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
      case LOGOUT_SUCCESS:
        return {
          loading:false,
          user:null,
          isAuthenticated:false


        }


    case LOGIN_FAIL:
      case REGISTER_FAIL :
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    
      case LOADUSER_FAIL:
        return {
          loading:false,
          isAuthenticated:false,
          user:null,
          error:action.payload
        }
        case LOGOUT_FAIL :
          return {
            ...state,
            laoding:false,
            error:action.payload
          }
    case CLEAR_ERRORS:

      return {
        ...state,
        error: null,
      }
    default:
      return state

  }

}

export const profilereducer = (state = {  }, action) => {
  switch (action.type) {
    case UPDATEUSER_REQUEST:
      case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST :

      return {
        ...state,
        loading:true
      };
 case UPDATEUSER_SUCCESS:
   case UPDATE_USER_SUCCESS:
      return {
        ...state,
     isupdated:action.payload
      };
    
      case DELETE_USER_SUCCESS:
        return {
          ...state,
       isdeleted:action.payload
        };
      
    case UPDATEUSER_FAIL:
      case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
     error: action.payload,
      };
 case UPDATEUSER_RESET:
   case UPDATE_USER_RESET:
   return {
     ...state,
     isupdated:false,
   }
   case DELETE_USER_RESET:
    return {
      ...state,
      isdeleted:false,
    }
    case CLEAR_ERRORS:

      return {
        ...state,
        error: null,
      }
    default:
      return state

  }

}