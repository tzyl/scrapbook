import * as React from "react";

import { Button, Intent, Spinner } from "@blueprintjs/core";

export interface ILoadingSpinnerProps {
  isLoading: boolean;
  text: string;
}

const LoadingSpinner: React.SFC<ILoadingSpinnerProps> = ({
  isLoading,
  text,
}) => {
  if (!isLoading) {
    return null;
  }
  return (
    <div className="loading-spinner-group">
      <Spinner className="loading-spinner pt-small" intent={Intent.SUCCESS} />
      <span>{text}</span>
    </div>
  );
};

export default LoadingSpinner;
