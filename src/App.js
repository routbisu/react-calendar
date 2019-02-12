import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Calendar from "./components/Calendar";

library.add(faChevronCircleRight, faChevronCircleLeft, faCalendarAlt);

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Router>
          <Route path="/:year/:month" component={Calendar} />
        </Router>
      </div>
    );
  }
}

export default App;
