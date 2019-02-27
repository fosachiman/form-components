import { DateUtils } from "react-day-picker";
import DayPicker from "react-day-picker";
import moment from "moment";

class DatePickerInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    formFunctions: PropTypes.object.isRequired,
    formState: PropTypes.object.isRequired,

    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.initialValue = props.defaultValue || "";
    this.placeholder = props.placeholder || "";
    this.state = {
      dateIsOpen: false
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleWindowClick);
    let hasError = false;
    this.props.formFunctions.updateField(this.props.name, this.initialValue);
    this.props.formFunctions.updateFieldErrors(this.props.name, hasError);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);
  }

  inputChange = e => {
    let value = e.label;
    this.props.formFunctions.updateField(
      this.props.name,
      value,
      this.props.onChange
    );
  };

  handleWindowClick = e => {
    const { $date } = this;
    if (
      e.target !== $date &&
      !$date.contains(e.target) &&
      this.state.dateIsOpen
    ) {
      this.setState({ dateIsOpen: false });
    }
  };

  handleDateClick = () => {
    if (!this.state.dateIsOpen) {
      this.setState({ dateIsOpen: true });
    }
  };

  inputChange = (d, m) => {
    // null check. validatenotblank can't handle objects.
    // possibly refactor validatenotblank to handle objects
    let value = JSON.stringify(d);
    this.props.formFunctions.updateField(
      this.props.name,
      value,
      this.props.onChange
    );
    if (!m.disabled) {
      this.setState({
        dateIsOpen: false
      });
    }
  };

  render() {
    const { dateIsOpen } = this.state;

    const value = this.props.formState.values[this.props.name];

    // null check. validatenotblank can't handle objects.
    // possibly refactor validatenotblank to handle objects
    const date = value ? JSON.parse(value) : undefined;
    const now = new Date();

    const dateClassNames = classNames("date-picker", {
      "date-picker--open": dateIsOpen
    });

    const inputClassNames = classNames("date-picker-date", {
      "date-picker-date--placeholder": !date
    });

    const displayError =
      this.props.formState.errors[this.props.name] &&
      this.props.formState.submitAttempted;

    return (
      <div ref={e => (this.$date = e)} className={dateClassNames}>
        <div onClick={this.handleDateClick} className={inputClassNames}>
          {date ? moment(date).format("MMM D") : "Date:"}
        </div>
        <DayPicker
          placeholder={"placeholder"}
          disabledDays={day => DateUtils.isPastDay(day)}
          className={`${this.props.className} ${displayError ? "error" : ""}`}
          initialMonth={now}
          fromMonth={now}
          selectedDay={date}
          onDayClick={this.inputChange}
        />
      </div>
    );
  }
}

export default DatePickerInput;
