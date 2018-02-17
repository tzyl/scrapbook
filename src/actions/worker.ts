import { IPhoto } from "../types/events";
import { Dispatch } from "../types/redux";
import { IWorkerAction, WorkerActionDefinitions } from "../types/worker";
import generateThumbnails from "../util/thumbnail";

export const requestThumbnailsThenUpdate = (id: string, photos: IPhoto[]) => async (dispatch: Dispatch) => {
  dispatch(requestThumbnails(id));
  const withThumbnails = await generateThumbnails(photos);
  dispatch(receiveThumbnails(id, withThumbnails));
};

export const requestThumbnails = (id: string) => {
  return {
    type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
    payload: {
      id,
    },
  };
};

export const receiveThumbnails = (id: string, photos: IPhoto[]): IWorkerAction => {
  return {
    type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
    payload: {
      id,
      photos,
    },
  };
};
