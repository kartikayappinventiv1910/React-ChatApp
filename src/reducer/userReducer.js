import {
    GET_INBOXUSER_SUCCESS,
    GET_MESSAGES_FAILURE,
    GET_MESSAGES_SUCCESS,
    GET_USER_SUCCESS,
  } from "../action/actionNames";
  
  const initialState = {
    users: [],
    inboxusers: [],
    conversations: [],
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case GET_USER_SUCCESS: {
        state = {
          ...state,
          users: action.payLoad.users,
        };
        break;
      }
  
      case GET_INBOXUSER_SUCCESS: {
        state = {
          ...state,
          inboxusers: action.payLoad.inboxUsers,
        };
        break;
      }
  
      case GET_MESSAGES_SUCCESS: {
        state = {
          ...state,
          conversations: action.payLoad.convo,
        };
        break;
      }
  
      case GET_MESSAGES_FAILURE: {
        state = {
          ...state,
          conversations: [],
        };
        break;
      }
    }
    return state;
  }