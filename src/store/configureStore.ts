import * as localForage from "localforage";
import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";

import rootReducer from "../reducers";

import * as EditorActions from "../actions/editor";
import * as EventsActions from "../actions/events";
import * as GalleryActions from "../actions/gallery";
import * as TimelineActions from "../actions/timeline";

const persistConfig: PersistConfig = {
  key: "root",
  storage: localForage,
 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionCreators: {...EventsActions, ...GalleryActions, ...TimelineActions, ...EditorActions},
    }) : compose;

const configureStore = () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(logger)),
  );
  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;
