let Root: any;
// tslint:disable:no-var-requires
if (process.env.NODE_ENV === "production") {
  Root = require("./Root.prod").default;
} else {
  Root = require("./Root.dev").default;
}
export default Root;
