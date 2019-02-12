import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Calendar.scss";
import {
  getMonthName,
  getLastDate,
  getDayFromDate
} from "../services/commonService";

export default class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: 1,
      currentYear: 1970,
      dates: []
    };
  }

  generateDatesForMonth(currentMonth, currentYear) {
    // Get first day of current month
    const firstDateDayCurrentMonth = getDayFromDate(
      currentYear,
      currentMonth,
      1,
      true
    );

    // Last date of the month
    const lastDate = getLastDate(currentYear, currentMonth);

    let allDates = [];
    let pointerDate = 1;

    const year = currentMonth > 1 ? currentYear : currentYear - 1;
    const month = currentMonth > 1 ? currentMonth - 1 : 12;
    const lastDateLastMonth = getLastDate(year, month);

    // First overflow week
    if (firstDateDayCurrentMonth > 0) {
      const firstDateDayCurrentMonth = getDayFromDate(year, month, 1, true);
      const firstDateOfCalendar =
        lastDateLastMonth - firstDateDayCurrentMonth + 1;
      let firstWeek = [];

      for (let i = firstDateOfCalendar; i <= lastDateLastMonth; i++) {
        firstWeek.push({ date: i, isOverflow: true });
      }

      if (firstDateDayCurrentMonth < 6) {
        for (let i = 1; i < 7 - firstDateDayCurrentMonth + 1; i++) {
          firstWeek.push({ date: i });
          pointerDate = i + 1;
        }
      }

      allDates.push(firstWeek);
    }

    console.log("alldates", allDates);

    // Generate dates for the next 3 weeks
    for (let j = 0; j < 3; j++) {
      let week = [];
      for (let i = 0; i < 7; i++) {
        week.push({ date: pointerDate++ });
      }
      allDates.push(week);
    }

    // Generate dates for last week
    if (pointerDate < lastDate) {
      let lastWeek = [];
      let overFlowLastWeekDate = 1;
      for (let i = 0; i < 7; i++) {
        if (pointerDate <= lastDate) {
          lastWeek.push({ date: pointerDate++ });
        } else {
          lastWeek.push({ date: overFlowLastWeekDate++, isOverflow: true });
        }
      }
      allDates.push(lastWeek);
    }

    // Set date is state
    this.setState({ dates: allDates });
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params) {
      if (this.props.match.params.year && this.props.match.params.month) {
        // Find last date of the month
        const currrentYear = this.props.match.params.year;
        const currentMonth = this.props.match.params.month;

        this.setState({
          currentMonth: currentMonth,
          currentYear: currrentYear
        });

        this.generateDatesForMonth(currentMonth, currrentYear);
      }
    }
  }

  render() {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <div className="month-name">
            {getMonthName(this.state.currentMonth)} {this.state.currentYear}
          </div>
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
              <FontAwesomeIcon icon="chevron-circle-left" className="fa-icon" />
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

          {this.state.dates &&
            this.state.dates.length > 0 &&
            this.state.dates.map((week, i) => (
              <div className="day-row" key={i}>
                {week.map((date, j) => (
                  <span className="calendar-day" key={j}>
                    {date.date}
                  </span>
                ))}
              </div>
            ))}

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
    );
  }
}
