let configureStore: any;
// tslint:disable:no-var-requires
if (process.env.NODE_ENV === "production") {
  configureStore = require("./configureStore.prod").default;
} else {
  configureStore = require("./configureStore.dev").default;
}
export default configureStore;
