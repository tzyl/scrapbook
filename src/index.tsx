import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import App from "./components/App";
import configureStore from "./store/configureStore";

const { persistor, store } = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root"),
);
