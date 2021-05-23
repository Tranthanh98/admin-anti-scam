import { alertify } from "./alertify.reducer";

const { combineReducers } = require("redux");
const { loadingReducer } = require("./loading.reducer");
const { loginReducer } = require("./login.reducer");

const appReducers = combineReducers({
  loginReducer: loginReducer,
  loadingReducer: loadingReducer,
  alertify: alertify,
});

export default appReducers;
