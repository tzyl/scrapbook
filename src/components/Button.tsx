import * as React from "react";

export interface IButtonDispatchProps {
  onClick?: (e: any) => any;
}

export interface IButtonOwnProps {
  children?: React.ReactChild;
  type?: string;
}

export type IButtonProps = IButtonDispatchProps & IButtonOwnProps;

const Button: React.SFC<IButtonProps> = ({ onClick, type, children }) => (
  <button className="btn" type={type} onClick={onClick}>{children}</button>
);

export default Button;
