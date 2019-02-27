import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import moment from "moment";
import DateWeekday from "./DateWeekday";

class DatePickerInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    children: PropTypes.node,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    setter: PropTypes.object,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    hideLabel: PropTypes.bool
  };

  Navbar({ onPreviousClick, onNextClick, className }) {
    const styleLeft = {
      position: "absolute",
      left: "20%",
      top: "8px",
      height: "18px",
      width: "27px",
      transform: "rotate(-90deg)",
      fill: "rgb(116, 50, 55)"
    };
    const styleRight = {
      position: "absolute",
      right: "20%",
      top: "8px",
      height: "18px",
      width: "27px",
      transform: "rotate(90deg)",
      fill: "rgb(116, 50, 55)"
    };
    return (
      <div className={className}>
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="30px"
          height="16px"
          viewBox="35 32.834 30 16"
          enableBackground="new 35 32.834 30 16"
          xmlSpace="preserve"
          style={styleLeft}
          onClick={() => onPreviousClick()}
        >
          <polygon points="59.573,43.047 49.833,33.478 49.759,33.406 49.687,33.48 40.132,43.05 40.84,43.757 49.768,34.815 58.872,43.76 " />
        </svg>
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="30px"
          height="16px"
          viewBox="35 32.834 30 16"
          enableBackground="new 35 32.834 30 16"
          xmlSpace="preserve"
          style={styleRight}
          onClick={() => onNextClick()}
        >
          <polygon points="59.573,43.047 49.833,33.478 49.759,33.406 49.687,33.48 40.132,43.05 40.84,43.757 49.768,34.815 58.872,43.76 " />
        </svg>
      </div>
    );
  }

  handleDateChange = day => {
    const dateString = moment(day).format("MM/DD/YYYY");
    this.props.setter[this.props.name](dateString);
  };

  render() {
    const { className, name, label, errorMessage, hideLabel } = this.props;
    return (
      <div className={className}>
        {this.props.label && (
          <label className={hideLabel ? "hidden" : ""} htmlFor={name}>
            {label || labelFromName(name)}
          </label>
        )}
        <DayPickerInput
          onDayChange={day => this.handleDateChange(day)}
          formatDate={formatDate}
          parseDate={parseDate}
          format={"MM/DD/YYYY (dddd)"}
          placeholder={`mm/dd/yyyy`}
          inputProps={{ readOnly: true }}
          dayPickerProps={{
            weekdayElement: <DateWeekday />,
            navbarElement: <this.Navbar />,
            disabledDays: [{ before: moment().toDate() }]
          }}
        />
        <svg
          version="1.1"
          x="0px"
          y="0px"
          width="27px"
          height="15px"
          viewBox="302.5 258.167 186 101"
          enableBackground="new 302.5 258.167 186 101"
          fill="rgb(182, 141, 87)"
          className="day-picker-dropdown-arrow"
        >
          <g>
            <path d="M487.13,267.79l-7.418-7.418l-83.697,83.696l-83.697-83.696l-7.418,7.379c0,0,89.772,88.967,91.11,88.974 C397.352,356.731,487.13,267.79,487.13,267.79z" />
          </g>
        </svg>
        <div className="error-message">{errorMessage}</div>
      </div>
    );
  }
}

export default DatePickerInput;
