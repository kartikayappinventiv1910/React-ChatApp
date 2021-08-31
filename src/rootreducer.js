import { combineReducers } from "redux";

import authReducer from "./reducer/authReducer";
import userReducer from "./reducer/userReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
// import { combineReducers } from "redux";
// import authReducer from './reducer/authreducer';
// import userReducer from './reducer/userReducer';

// const rootReducer = combineReducers({
//     auth: authReducer,
//     user: userReducer,
// });


// export default () => {
//     return {user:"kt"}
// }