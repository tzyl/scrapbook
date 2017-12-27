import * as React from "react";

import { Header } from "./Header";

export interface IAppProps {
  active: string;
}

export const App: React.SFC<IAppProps> = (props) => {
  return (
    <div>
      <Header title={props.active} />
    </div>
  );
};
