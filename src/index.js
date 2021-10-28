import express from "express";
import renderer from "./hepler/renderer";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.send(renderer(req));
});

app.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});
