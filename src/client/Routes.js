import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";

export default () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={Home} />
    </React.Fragment>
  );
};
