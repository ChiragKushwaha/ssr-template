import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import searialize from "serialize-javascript";
import { renderRoutes } from "react-router-config";

import Routes from "../client/Routes";

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <>{renderRoutes(Routes)}</>
      </StaticRouter>
    </Provider>
  );

  return `<html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE = ${searialize(store.getState())} </script>
        <script src="bundle.js"></script>
      </body>
    </html>`;
};
