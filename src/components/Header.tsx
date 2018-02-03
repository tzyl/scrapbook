import * as React from "react";

import {
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

import ConnectedHeaderControls from "../containers/HeaderControls";
import { EditorMode } from "../types/editor";

const Header: React.SFC<{}> = () => {
  return (
    <Navbar className="pt-dark pt-fixed-top">
      <NavbarGroup>
        <NavbarHeading>scrapbook</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup>
        <NavbarDivider />
        <ConnectedHeaderControls />
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
