import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";

library.add(faChevronCircleRight, faChevronCircleLeft, faCalendarAlt);

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="calendar">
          <div className="calendar-header">
            <div className="month-name">January 2019</div>
            <div className="calendar-controls">
              <select className="date-selector">
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
              </select>
              <select className="date-selector">
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
              </select>
              <button className="btn-month-nav">
                <FontAwesomeIcon
                  icon="chevron-circle-left"
                  className="fa-icon"
                />
                Prev
              </button>
              <button className="btn-month-nav">
                Next
                <FontAwesomeIcon
                  icon="chevron-circle-right"
                  className="fa-icon"
                />
              </button>
            </div>
          </div>
          <div className="calendar-body">
            <div className="days-header">
              <span className="day-type">Sun</span>
              <span className="day-type">Mon</span>
              <span className="day-type">Tue</span>
              <span className="day-type">Wed</span>
              <span className="day-type">Thu</span>
              <span className="day-type">Fri</span>
              <span className="day-type">Sat</span>
            </div>
            <div className="day-row">
              <span className="calendar-day sunday">1</span>
              <span className="calendar-day">1</span>
              <span className="calendar-day">1</span>
              <span className="calendar-day">1</span>
              <span className="calendar-day">1</span>
              <span className="calendar-day">1</span>
              <span className="calendar-day br-1">1</span>
            </div>
            <div className="day-row">
              <span className="calendar-day sunday">10</span>
              <span className="calendar-day">11</span>
              <span className="calendar-day">12</span>
              <span className="calendar-day">1</span>
              <span className="calendar-day">1</span>
              <span className="calendar-day">1</span>
              <span className="calendar-day br-1">1</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
