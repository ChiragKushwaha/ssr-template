import "@babel/polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";

import Routes from "./client/Routes";
import renderer from "./helper/renderer";
import createStore from "./helper/createStore";

const app = express();
const PORT = 3000;

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    },
  })
);
app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore(req);

  // Some logic to initialize and load data into store
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
      if (promise !== null) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});
