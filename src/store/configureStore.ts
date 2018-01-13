import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";

import rootReducer from "../reducers";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger)),
  );
};

export default configureStore;
