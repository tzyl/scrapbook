import * as React from "react";

export interface IButtonDispatchProps {
  onClick: (event: any) => any;
}

export interface IButtonOwnProps {
  children?: React.ReactChild;
}

export type IButtonProps = IButtonDispatchProps & IButtonOwnProps;

const Button: React.SFC<IButtonProps> = ({ children, onClick }) => (
  <button className="button" onClick={onClick}>{children}</button>
);

export default Button;
