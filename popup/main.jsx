import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./Popup";
import "../styles/globals.css";

import { Provider } from "react-redux";
import user from "../reducers/user";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ user });

const persistConfig = { key: "newsnexus", storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Popup />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
