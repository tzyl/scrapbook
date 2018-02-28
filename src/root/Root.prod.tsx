import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import App from "../containers/App";

export default class Root extends React.Component<{store: any, persistor: any}> {
  public render() {
    const { store, persistor } = this.props;
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    );
  }
}
