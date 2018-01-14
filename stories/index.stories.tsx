import * as React from "react";

import { storiesOf } from "@storybook/react";

import Header from "../src/components/Header";
import GalleryModal from "../src/components/GalleryModal";
import TimelinePage from "../src/components/TimelinePage";
import { IScrapbookEvent, IScrapbookPhoto } from "../src/types/events";

import { mockEvents, mockPhotos } from "../src/mockData";

import "../src/styles.less";

storiesOf("Header", module)
  .add("Header title", () => <Header title="Storybook title 😀" goHome={null} />);

storiesOf("TimelinePage", module)
  .add("Example with mock events", () => {
    const openEvent = (): any => null;
    return <TimelinePage events={mockEvents} openEvent={openEvent} />;
  });

storiesOf("GalleryModal", module)
  .add("Lightbox closed", () => {
    return (
      <GalleryModal
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
      <GalleryModal
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
