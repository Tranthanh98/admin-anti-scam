/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import App from "App";
import "assets/css/material-dashboard-react.module.css";
// core components
import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import appReducers from "./reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import * as Firebase from 'firebase';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import LoadingComponent from "components/LoadingComponent";

const persistConfig = {
  key: "userProfile",
  storage: storage,
  whitelist: ["loginReducer"], // Xem thêm tại mục "Quá trình merge".
};

const pReducer = persistReducer(persistConfig, appReducers);

const store = createStore(pReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingComponent />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
