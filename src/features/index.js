import authReducer from "./authSlice";
import usersReducer from "./usersSlice";

const rootReducer = {
  auth: authReducer,
  users: usersReducer,
};

export default rootReducer;
