import * as localForage from "localforage";
import { applyMiddleware, compose, createStore } from "redux";
import { persistState } from "redux-devtools";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";

import rootReducer from "../reducers";
import DevTools from "../root/DevTools";

const persistConfig: PersistConfig = {
  key: "root",
  storage: localForage,
 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancer = compose(
  applyMiddleware(logger),
  DevTools.instrument(),
  persistState(getDebugSessionKey()),
);

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

const configureStore = () => {
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;
