class StandardInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired,
    formFunctions: PropTypes.object.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    textFormatting: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    innerRef: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.initialValue = props.defaultValue || "";
  }

  componentDidMount() {
    let hasError = false;
    this.props.formFunctions.updateField(this.props.name, this.initialValue);
    this.props.formFunctions.updateFieldErrors(this.props.name, hasError);
  }

  inputChange = e => {
    let value = e.target.value;
    if (this.props.textFormatting)
      value = this.props.textFormatting(
        value,
        this.props.formState.values[this.props.name]
      );
    this.props.formFunctions.updateField(
      this.props.name,
      value,
      this.props.onChange
    );
  };

  render() {
    const displayError =
      this.props.formState.errors[this.props.name] &&
      this.props.formState.submitAttempted;
    return (
      <input
        type={this.props.type || "text"}
        className={`${this.props.className} ${displayError ? "error" : ""}`}
        style={this.props.style}
        disabled={this.props.disabled}
        name={this.props.name}
        onChange={e => this.inputChange(e)}
        value={this.props.formState.values[this.props.name] || ""}
        placeholder={this.props.placeholder}
        ref={this.props.innerRef}
      />
    );
  }
}

export default StandardInput;
