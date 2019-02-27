class DateWeekday extends React.Component {
  static propTypes = {
    weekday: PropTypes.number,
    locale: PropTypes.string,
    localeUtils: PropTypes.object,
    className: PropTypes.string
  };

  render() {
    const weekdayName = this.props.localeUtils.formatWeekdayLong(
      this.props.weekday,
      this.props.locale
    );
    return (
      <div className={this.props.className} title={weekdayName}>
        {weekdayName.slice(0, 1)}
      </div>
    );
  }
}

export default DateWeekday;
