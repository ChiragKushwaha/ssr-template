import "@babel/polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";

import Routes from "./client/Routes";
import renderer from "./hepler/renderer";
import createStore from "./hepler/createStore";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore();

  // Some logic to initialize and load data into store
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});

app.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});
