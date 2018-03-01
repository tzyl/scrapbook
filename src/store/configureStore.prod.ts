import * as localForage from "localforage";
import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";

import rootReducer from "../reducers";

const persistConfig: PersistConfig = {
  key: "root",
  storage: localForage,
 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;
