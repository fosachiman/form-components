export default class TextareaInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string
  };

  render() {
    const {
      className,
      name,
      label,
      value,
      onChange,
      type,
      placeholder,
      errorMessage
    } = this.props;
    return (
      <div className={className}>
        <label htmlFor={name}>{label || labelFromName(name)}</label>
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          id={name}
          type={type || "text"}
        />
        <div className="error-message">{errorMessage}</div>
      </div>
    );
  }
}
