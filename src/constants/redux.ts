import { Dispatch } from "redux";

export interface IStoreState {
  property: string;
}

export interface IAction {
  readonly type: string;
  readonly payload?: any;
}

export type Dispatch = Dispatch<IStoreState>;
