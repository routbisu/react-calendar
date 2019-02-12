import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./components/Calendar";

library.add(faChevronCircleRight, faChevronCircleLeft, faCalendarAlt);

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Router>
          <div>
            <Switch>
              <Route path="/:year/:month" component={Calendar} />
              <Route path="/" component={Calendar} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
