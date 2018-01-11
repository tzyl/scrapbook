import * as React from "react";

import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";
import Header from "./Header";
import ScrapbookGallery from "./ScrapbookGallery";
import ScrapbookTimeline from "./ScrapbookTimeline";

const mockEvents: IScrapbookEvent[] = [
  {
    createdAt: "2016-01-01",
    description: (
      <p>I received the payment for $543. Should be shipping the item
      within a couple of hours. Thanks for the order!</p>
    ),
    id: "123",
    photos: [],
    subtitle: "Test subtitle",
    title: "John Doe sent a SMS",
  },
  {
    createdAt: "2016-09-11 09:06 AM",
    description: (
      <div>
        <p>Subject: Any updates?</p>
        <p>Like we talked, you said that you would share the shipment details? This is an urgent order and so
          I am losing patience. Can you expedite the process and pls do share the details asap. Consider this
          a gentle reminder if you are on track already!</p>
        <p>- Maya</p>
      </div>
    ),
    id: "456",
    photos: [],
    title: "You sent an email to John Doe",
  },
];

const mockPhotos: IScrapbookPhoto[] = [
  { src: require("../../public/album1/1.jpg"), width: 4, height: 3 },
  { src: require("../../public/album1/2.jpg"), width: 1, height: 1 },
  { src: require("../../public/album1/3.jpg"), width: 3, height: 4 },
  { src: require("../../public/album1/4.jpg"), width: 3, height: 4 },
  { src: require("../../public/album1/5.jpg"), width: 3, height: 4 },
  { src: require("../../public/album1/6.jpg"), width: 4, height: 3 },
  { src: require("../../public/album1/7.jpg"), width: 3, height: 4 },
  { src: require("../../public/album1/8.jpg"), width: 4, height: 3 },
  { src: require("../../public/album1/9.jpg"), width: 4, height: 3 },
];

const App: React.SFC<{}> = (props) => {
  return (
    <div>
      <Header title="Timeline" />
      <ScrapbookTimeline events={mockEvents} />
      <ScrapbookGallery
        photos={mockPhotos}
        galleryIsOpen={true}
        lightboxIsOpen={false}
        openLightbox={null}
        closeLightbox={null}
        gotoPrevious={null}
        gotoNext={null}
        currentImage={0}
      />
    </div>
  );
};

export default App;
