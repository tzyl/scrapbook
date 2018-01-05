import * as React from "react";

import { Header } from "./Header";
import { IEvent, ScrapbookTimeline } from "./ScrapbookTimeline";

const mockEvents: IEvent[] = [
  {
    content: (
      <p>I received the payment for $543. Should be shipping the item
      within a couple of hours. Thanks for the order!</p>
    ),
    createdAt: "2016-09-12 10:06 PM",
    icon: <i className="material-icons md-18">textsms</i>,
    iconColor: "#6fba1c",
    title: "John Doe sent a SMS",
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
    createdAt: "2016-09-11 09:06 AM",
    icon: <i className="material-icons md-18">email</i>,
    iconColor: "#03a9f4",
    title: "You sent an email to John Doe",
  },
];

export const App: React.SFC<{}> = (props) => {
  return (
    <div>
      <Header title="Timeline" />
      <ScrapbookTimeline events={mockEvents} />
    </div>
  );
};
