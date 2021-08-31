import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import  rootReducer from "../rootreducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from '../rootreducer';
// import thunk from 'redux-thunk';


// const store = createStore(rootReducer, applyMiddleware(thunk));


// export default store;