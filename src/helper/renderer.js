import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import searialize from "serialize-javascript";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";

import Routes from "../client/Routes";

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <>{renderRoutes(Routes)}</>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `<html>
      <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE = ${searialize(store.getState())} </script>
        <script src="bundle.js"></script>
      </body>
    </html>`;
};
