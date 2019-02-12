import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Calendar.scss";
import {
  getMonthName,
  getLastDate,
  getDayFromDate,
  weekDays,
  monthsDict
} from "../services/commonService";
import classNames from "classnames";

export default class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: 1,
      currentYear: 1970,
      dates: []
    };
    this.showNext = this.showNext.bind(this);
    this.showPrev = this.showPrev.bind(this);
  }

  generateDatesForMonth(currentMonth, currentYear) {
    // Get current date
    const currFullDate = new Date();
    const currYear = currFullDate.getFullYear();
    const currMonth = currFullDate.getMonth() + 1;
    const currDate = currFullDate.getDate();

    // Last date of the month
    const lastDate = getLastDate(currentYear, currentMonth);

    let allDates = [];
    let pointerDate = 1;

    const year = currentMonth > 1 ? currentYear : currentYear - 1;
    const month = currentMonth > 1 ? currentMonth - 1 : 12;
    const lastDateLastMonth = getLastDate(year, month);

    // First overflow week
    const firstDateDayCurrentMonth = getDayFromDate(year, month, 1, true);
    const firstDateOfCalendar =
      lastDateLastMonth - firstDateDayCurrentMonth + 1;
    let firstWeek = [];

    for (let i = firstDateOfCalendar; i <= lastDateLastMonth; i++) {
      firstWeek.push({ date: i, isOverflow: true });
    }

    if (firstDateDayCurrentMonth <= 6) {
      for (let i = 1; i < 7 - firstDateDayCurrentMonth + 1; i++) {
        if (
          parseInt(currYear) === parseInt(currentYear) &&
          parseInt(currMonth) === parseInt(currentMonth) &&
          parseInt(currDate) === parseInt(i)
        ) {
          firstWeek.push({ date: i, isCurrentDate: true });
        } else {
          firstWeek.push({ date: i });
        }
        pointerDate = i + 1;
      }
    }

    allDates.push(firstWeek);

    // Generate dates for the next few weeks
    while (pointerDate <= lastDate) {
      let week = [];
      let overFlowLastWeekDate = 1;
      for (let i = 0; i < 7; i++) {
        if (pointerDate <= lastDate) {
          if (
            parseInt(currYear) === parseInt(currentYear) &&
            parseInt(currMonth) === parseInt(currentMonth) &&
            parseInt(currDate) === parseInt(pointerDate)
          ) {
            week.push({ date: pointerDate++, isCurrentDate: true });
          } else {
            week.push({ date: pointerDate++ });
          }
        } else {
          week.push({ date: overFlowLastWeekDate++, isOverflow: true });
        }
      }
      allDates.push(week);
    }

    // Set date is state
    this.setState({ dates: allDates });
  }

  componentDidMount() {
    // Get current year and month
    const currentDate = new Date();
    let currrentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;

    // Get month and year from url params if present
    if (this.props.match && this.props.match.params) {
      if (this.props.match.params.year && this.props.match.params.month) {
        // Find last date of the month
        currrentYear = this.props.match.params.year;
        currentMonth = this.props.match.params.month;
      }
    }

    this.setState({
      currentMonth: currentMonth,
      currentYear: currrentYear
    });

    this.generateDatesForMonth(currentMonth, currrentYear);
    this.props.history.push(`/${currrentYear}/${currentMonth}`);
  }

  /**
   * Show next month
   */
  showNext() {
    const stateMonth = parseInt(this.state.currentMonth);
    const stateYear = parseInt(this.state.currentYear);
    const currMonth = stateMonth < 12 ? stateMonth + 1 : 1;
    const currYear = stateMonth < 12 ? stateYear : stateYear + 1;
    this.props.history.push(`/${currYear}/${currMonth}`);
    this.setState({
      currentMonth: currMonth,
      currentYear: currYear
    });
    this.generateDatesForMonth(currMonth, currYear);
  }

  /**
   * Show previous month
   */
  showPrev() {
    const stateMonth = parseInt(this.state.currentMonth);
    const stateYear = parseInt(this.state.currentYear);
    const currMonth = stateMonth > 1 ? stateMonth - 1 : 12;
    const currYear = stateMonth > 1 ? stateYear : stateYear - 1;
    this.props.history.push(`/${currYear}/${currMonth}`);
    this.setState({
      currentMonth: currMonth,
      currentYear: currYear
    });
    this.generateDatesForMonth(currMonth, currYear);
  }

  showCurrentMonth() {
    const currentDate = new Date();
    const currYear = currentDate.getFullYear();
    const currMonth = currentDate.getMonth() + 1;

    this.props.history.push(`/${currYear}/${currMonth}`);
    this.setState({
      currentMonth: currMonth,
      currentYear: currYear
    });
    this.generateDatesForMonth(currMonth, currYear);
  }

  /**
   * Change year from dropdown
   * @param {any} evt
   */
  changeYear(evt) {
    const selectedYear = evt.target.value;
    this.setState({ currentYear: selectedYear });
    this.generateDatesForMonth(this.state.currentMonth, selectedYear);
    this.props.history.push(`/${selectedYear}/${this.state.currentMonth}`);
  }

  /**
   * Change year from dropdown
   * @param {any} evt
   */
  changeMonth(evt) {
    const selectedMonth = evt.target.value;
    this.setState({ currentMonth: selectedMonth });
    this.generateDatesForMonth(selectedMonth, this.state.currentYear);
    this.props.history.push(`/${this.state.currentYear}/${selectedMonth}`);
  }

  render() {
    let yearsDropdownJSX = [];
    for (let i = 1990; i < 2031; i++) {
      yearsDropdownJSX.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <div className="month-name">
            {getMonthName(this.state.currentMonth)} {this.state.currentYear}
          </div>
          <div className="calendar-controls">
            <select
              className="date-selector"
              onChange={this.changeYear.bind(this)}
              value={this.state.currentYear}
            >
              {yearsDropdownJSX}
            </select>
            <select
              className="date-selector"
              onChange={this.changeMonth.bind(this)}
              value={this.state.currentMonth}
            >
              {monthsDict.map((item, i) => (
                <option value={i + 1} key={i}>
                  {item}
                </option>
              ))}
            </select>
            <button
              className="btn-month-nav"
              onClick={this.showCurrentMonth.bind(this)}
            >
              Current Month
              <FontAwesomeIcon icon="calendar-alt" className="fa-icon" />
            </button>
            <button className="btn-month-nav" onClick={this.showPrev}>
              <FontAwesomeIcon icon="chevron-circle-left" className="fa-icon" />
              Prev
            </button>
            <button className="btn-month-nav" onClick={this.showNext}>
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
            {weekDays.map((item, i) => (
              <span className="day-type" key={i}>
                {item}
              </span>
            ))}
          </div>

          {this.state.dates &&
            this.state.dates.length > 0 &&
            this.state.dates.map((week, i) => (
              <div className="day-row" key={i}>
                {week.map((date, j) => (
                  <span
                    className={classNames(
                      "calendar-day",
                      { sunday: j === 0 },
                      { "br-1": j === 6 },
                      { overflow: date.isOverflow },
                      { "current-date": date.isCurrentDate }
                    )}
                    key={j}
                  >
                    <span>{date.date}</span>
                  </span>
                ))}
              </div>
            ))}
        </div>
      </div>
    );
  }
}
