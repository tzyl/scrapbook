import * as React from "react";
import { connect } from "react-redux";

import { closeGallery } from "../actions/gallery";
import Header, { IHeaderDispatchProps, IHeaderStateProps } from "../components/Header";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IHeaderStateProps => {
  return {
    title: state.gallery.galleryIsOpen ? "Gallery" : "Timeline",
  };
};

const mapDispatchToPros = (dispatch: Dispatch): IHeaderDispatchProps => {
  return {
    goHome: () => dispatch(closeGallery()),
  };
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToPros)(Header);

export default ConnectedHeader;
