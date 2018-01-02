export interface IStoreTimelineState {
  values: string[];
  index: number;
}

export const defaultStoreTimelineState: IStoreTimelineState = {
  index: null,
  values: [],
};
