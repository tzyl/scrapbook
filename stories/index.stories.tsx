import * as React from "react";

import { storiesOf } from "@storybook/react";

import Header from "../src/components/Header";
import ScrapbookGallery from "../src/components/ScrapbookGallery";
import ScrapbookTimeline from "../src/components/ScrapbookTimeline";
import { IScrapbookEvent, IScrapbookPhoto } from "../src/types/events";

import { mockEvents, mockPhotos } from "../src/mockData";

import "../src/styles.less";

storiesOf("Header", module)
  .add("Header title", () => <Header title="Storybook title 😀" goHome={null} />);

storiesOf("ScrapbookTimeline", module)
  .add("Example with mock events", () => {
    const openEvent = (): any => null;
    return <ScrapbookTimeline events={mockEvents} openEvent={openEvent} />;
  });

storiesOf("ScrapbookGallery", module)
  .add("Lightbox closed", () => {
    return (
      <ScrapbookGallery
        photos={mockPhotos}
        galleryIsOpen={true}
        lightboxIsOpen={false}
        closeGallery={null}
        openLightbox={null}
        closeLightbox={null}
        gotoPrevious={null}
        gotoNext={null}
        currentImage={0}
      />
    );
  }).add("Lightbox open", () => {
    return (
      <ScrapbookGallery
        photos={mockPhotos}
        galleryIsOpen={true}
        lightboxIsOpen={true}
        closeGallery={null}
        openLightbox={null}
        closeLightbox={null}
        gotoPrevious={null}
        gotoNext={null}
        currentImage={0}
      />
    );
  });
