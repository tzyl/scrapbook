import * as React from "react";
import * as ReactDOM from "react-dom";

import Root from "./root/Root";
import configureStore from "./store/configureStore";

const { persistor, store } = configureStore();

ReactDOM.render(
    <Root store={store} persistor={persistor} />,
    document.getElementById("root"),
);
