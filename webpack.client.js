const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

const config = {
  mode: "production",

  // Tell webpack the route file of our server application
  entry: "./src/client/client.js",

  // Tell webpack where to put the output file that is generated
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
};

module.exports = merge(baseConfig, config);
