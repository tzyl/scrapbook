import * as React from "react";

import { IScrapbookEvent, IScrapbookPhoto } from "./types/events";

export const mockEvents: IScrapbookEvent[] = [
  {
    id: "123",
    title: "John Doe sent a SMS",
    createdAt: "2016-01-01",
    icon: ":speech_balloon:",
    subtitle: "Test subtitle",
    description: "Description for album 1",
    photos: [
      { src: require("../public/album1/1.jpg"), width: 4, height: 3 },
      { src: require("../public/album1/2.jpg"), width: 1, height: 1 },
      { src: require("../public/album1/3.jpg"), width: 3, height: 4 },
      { src: require("../public/album1/4.jpg"), width: 3, height: 4 },
      { src: require("../public/album1/5.jpg"), width: 3, height: 4 },
      { src: require("../public/album1/6.jpg"), width: 4, height: 3 },
      { src: require("../public/album1/7.jpg"), width: 3, height: 4 },
      { src: require("../public/album1/8.jpg"), width: 4, height: 3 },
      { src: require("../public/album1/9.jpg"), width: 4, height: 3 },
    ],
  },
  {
    id: "456",
    title: "You sent an email to John Doe",
    createdAt: "2016-09-11 09:06 AM",
    icon: ":email:",
    description: "Description for album 2",
    photos: [
      { src: require("../public/album2/1.jpg"), width: 1, height: 1 },
      { src: require("../public/album2/2.jpg"), width: 480, height: 318 },
      { src: require("../public/album2/3.jpg"), width: 480, height: 318 },
      { src: require("../public/album2/4.jpg"), width: 480, height: 318 },
      { src: require("../public/album2/5.jpg"), width: 480, height: 318 },
    ],
  },
];

export const mockPhotos: IScrapbookPhoto[] = [
  { src: require("../public/album1/1.jpg"), width: 4, height: 3 },
  { src: require("../public/album1/2.jpg"), width: 1, height: 1 },
  { src: require("../public/album1/3.jpg"), width: 3, height: 4 },
  { src: require("../public/album1/4.jpg"), width: 3, height: 4 },
  { src: require("../public/album1/5.jpg"), width: 3, height: 4 },
  { src: require("../public/album1/6.jpg"), width: 4, height: 3 },
  { src: require("../public/album1/7.jpg"), width: 3, height: 4 },
  { src: require("../public/album1/8.jpg"), width: 4, height: 3 },
  { src: require("../public/album1/9.jpg"), width: 4, height: 3 },
];
