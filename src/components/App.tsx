import * as React from "react";

import { Header } from "./Header";
import { Timeline } from "./Timeline";

export const App: React.SFC<{}> = (props) => {
  return (
    <div>
      <Header title="Timeline" />
      <Timeline
        values={["2018-01-02"]}
        indexClick={() => null}
        index={0}
      />
    </div>
  );
};
