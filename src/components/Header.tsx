import * as React from "react";

export interface IHeaderStateProps {
  title: string;
}

export interface IHeaderDispatchProps {
  goHome: (event: any) => any;
}

export type IHeaderProps = IHeaderStateProps & IHeaderDispatchProps;

const Header: React.SFC<IHeaderProps> = ({
  title,
  goHome,
}) => {
  return (
    <div className="app-header">
      <h1>scrapbook</h1>
      <span>{title}</span>
      <button onClick={goHome}>Home</button>
    </div>
  );
};

export default Header;
