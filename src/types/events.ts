import { ILightboxPhoto } from "react-images";
import { IAction } from "./redux";

export interface IStoreEventsState extends Array<IScrapbookEvent> {}

export interface IScrapbookEvent {
  /**
   * Unique UUID to identify event.
   */
  id: string;

  /**
   * Text to display as the title of the event.
   */
  title: string;

  /**
   * Date in YYYY-MM-DD format.
   */
  createdAt: string;

  /**
   * String with colons to identify emoji e.g. ":rocket:".
   */
  icon: string;

  /**
   * Optional subtitle to display under title in timeline.
   */
  subtitle?: string;

  /**
   * Optional description to show in card in timeline.
   */
  description?: string;

  /**
   * Photos in the event.
   */
  photos: IScrapbookPhoto[];
}

export interface IScrapbookPhoto {
  src: string;
  thumbnail?: string;
  width: number;
  height: number;
}

export enum EventsActionDefinitions {
  ADD_EVENT = "ADD_EVENT",
  REMOVE_EVENT = "REMOVE_EVENT",
}

export interface IEventsAction extends IAction {
  type: EventsActionDefinitions;
}
