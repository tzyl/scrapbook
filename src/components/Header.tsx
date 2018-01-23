import * as React from "react";

import {
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

import { EditorMode } from "../types/editor";

export interface IHeaderDispatchProps {
  openEditor: () => any;
  setEditorMode: (mode: EditorMode) => any;
}

export type IIHeaderProps = IHeaderDispatchProps;

const Header: React.SFC<IIHeaderProps> = ({
  openEditor,
  setEditorMode,
}) => {
  const openEditorAdd = () => {
    setEditorMode(EditorMode.add);
    openEditor();
  };
  return (
    <Navbar className="pt-dark pt-fixed-top">
      <NavbarGroup>
        <NavbarHeading>scrapbook</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup>
        <NavbarDivider />
        <Button className="pt-minimal" iconName="pt-icon-add" onClick={openEditorAdd}>Create new event</Button>
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
