import { combineReducers } from "redux";

import adminsReducer from "./adminsReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
  admins: adminsReducer,
});
