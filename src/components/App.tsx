import * as React from "react";

import { Header } from "./Header";

export const App: React.SFC<{}> = (props) => {
  return (
    <div>
      <Header title="Timeline" />
    </div>
  );
};
