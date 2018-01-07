import * as React from "react";

export interface IHeaderProps { title: string; }

const Header: React.SFC<IHeaderProps> = (props) => {
  return (
    <div className="app-header">
      <h1>scrapbook</h1>
      <span>{props.title}</span>
    </div>
  );
};

export default Header;
