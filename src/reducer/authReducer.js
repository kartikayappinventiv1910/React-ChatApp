import {
    USER_LOGIN_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
   
  } from "../action/actionNames";
  
  const initialState = {
    name: "",
    email: "",
    authenticating: false,
    authenticated: false,
    error: null,
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case USER_LOGIN_REQUEST: {
        state = {
          ...state,
          authenticating: true,
        };
        break;
      }
      case USER_LOGIN_SUCCESS: {
        state = {
          ...state,
          ...action.payLoad.user,
          authenticated: true,
          authenticating: false,
        };
        break;
      }
      case USER_LOGIN_FAILURE: {
        state = {
          ...state,
          error: action.payLoad.error,
          authenticating: false,
          authenticated: false,
        };
        break;
      }
      // case USER_LOGOUT_REQUEST: {
      //   break;
      // }
  
      // case USER_LOGOUT_SUCCESS: {
      //   state = { ...initialState };
      //   break;
      // }
      // case USER_LOGOUT_FAILURE: {
      //   state = {
      //     ...state,
      //     error: action.payLoad.error,
      //   };
      //   break;
      // }
    }
  
    return state;
  }