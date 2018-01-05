import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Header } from "../src/components/Header";

storiesOf("Header", module)
  .add("Header title", () => <Header title="Storybook title" />);
