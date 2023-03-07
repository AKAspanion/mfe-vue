import { createBrowserHistory } from "history";

import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("react");
  const browserHistory = createBrowserHistory();

  mount({
    mountPoint: localRoot!,
    historyStrategy: browserHistory,
  });
});
