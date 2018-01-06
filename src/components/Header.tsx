import * as React from "react";

export interface IHeaderProps { title: string; }

export class Header extends React.Component<IHeaderProps> {
  public render() {
    return (
      <div className="app-header">
        <h1>scrapbook</h1>
        <span>{this.props.title}</span>
      </div>
    );
  }
}
