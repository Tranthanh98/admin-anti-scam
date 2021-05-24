import { alertify } from "./alertify.reducer";
import { modalReducer } from "./modal.reducer";

const { combineReducers } = require("redux");
const { loadingReducer } = require("./loading.reducer");
const { loginReducer } = require("./login.reducer");

const appReducers = combineReducers({
  loginReducer: loginReducer,
  loadingReducer: loadingReducer,
  alertify: alertify,
  modalReducer: modalReducer,
});

export default appReducers;
