import * as React from "react";

import { storiesOf } from "@storybook/react";

import Header from "../src/components/Header";
import ScrapbookGallery from "../src/components/ScrapbookGallery";
import ScrapbookTimeline, { ITimelineEvent } from "../src/components/ScrapbookTimeline";
import { IScrapbookPhoto } from "../src/types/events";

import "../src/styles.less";

storiesOf("Header", module)
  .add("Header title", () => <Header title="Storybook title 😀" />);

storiesOf("ScrapbookTimeline", module)
  .add("ScrapbookTimeline with mock events", () => {
    const mockEvents: ITimelineEvent[] = [
      {
        content: (
          <p>I received the payment for $543. Should be shipping the item
          within a couple of hours. Thanks for the order!</p>
        ),
        timelineEventProps: {
          container: "card",
          createdAt: "2016-01-01",
          icon: <i className="material-icons md-18">textsms</i>,
          iconColor: "#6fba1c",
          subtitle: "Test subtitle",
          title: "John Doe sent a SMS",
        },
      },
      {
        content: (
          <div>
            <p>Subject: Any updates?</p>
            <p>Like we talked, you said that you would share the shipment details? This is an urgent order and so
              I am losing patience. Can you expedite the process and pls do share the details asap. Consider this
              a gentle reminder if you are on track already!</p>
            <p>- Maya</p>
          </div>
        ),
        timelineEventProps: {
          createdAt: "2016-09-11 09:06 AM",
          icon: <i className="material-icons md-18">email</i>,
          iconColor: "#03a9f4",
          title: "You sent an email to John Doe",
        },
      },
    ];
    return <ScrapbookTimeline events={mockEvents} />;
  });

storiesOf("ScrapbookGallery", module)
  .add("ScrapbookGallery with Lightbox closed", () => {
    const mockPhotos: IScrapbookPhoto[] = [
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
    return (
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
    );
  }).add("ScrapbookGallery with Lightbox open", () => {
    const mockPhotos: IScrapbookPhoto[] = [
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
    return (
      <ScrapbookGallery
        photos={mockPhotos}
        galleryIsOpen={true}
        lightboxIsOpen={true}
        openLightbox={null}
        closeLightbox={null}
        gotoPrevious={null}
        gotoNext={null}
        currentImage={0}
      />
    );
  });
