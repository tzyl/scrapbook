import * as React from "react";

import { storiesOf } from "@storybook/react";

import GalleryModal from "../src/components/GalleryModal";
import Header from "../src/components/Header";
import TimelinePage from "../src/components/TimelinePage";
import { IScrapbookEvent, IScrapbookPhoto } from "../src/types/events";

import { mockEvents, mockPhotos } from "../src/mockData";

import "../src/styles.less";

storiesOf("scrapbook", module)
  .add("Header", () => <Header />)
  .add("Timeline page", () => {
    const openEvent = (): any => null;
    const openEditor = (): any => null;
    return <TimelinePage events={mockEvents} openEvent={openEvent} openEditor={openEditor} />;
  })
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
  })
  .add("Lightbox open", () => {
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
