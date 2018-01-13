import * as localForage from "localforage";
import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";

import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage: localForage,
 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(logger)),
  );
  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;
