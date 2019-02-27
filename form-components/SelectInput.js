import Select from "react-select";

class SelectInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    formFunctions: PropTypes.object.isRequired,
    formState: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    arrow: PropTypes.node.isRequired,

    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    searchable: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    clearable: PropTypes.bool,
    onChange: PropTypes.func,
    handleOnBlur: PropTypes.func
  };

  static defaultProps = {
    searchable: false,
    clearable: false,
    handleOnBlur: () => {}
  };

  constructor(props) {
    super(props);

    this.initialValue = props.defaultValue || "";
    this.placeholder = props.placeholder || "";
  }

  componentDidMount() {
    let hasError = false;
    this.props.formFunctions.updateField(this.props.name, this.initialValue);
    this.props.formFunctions.updateFieldErrors(this.props.name, hasError);
  }

  inputChange = e => {
    this.selectedOption = e;
    let value = e.value;
    this.props.formFunctions.updateField(
      this.props.name,
      value,
      this.props.onChange
    );
  };

  renderArrow = () => {
    return this.props.arrow;
  };

  handleOnBlur = () => {
    this.props.handleOnBlur();
  };

  render() {
    const displayError =
      this.props.formState.errors[this.props.name] &&
      this.props.formState.submitAttempted;

    return (
      <Select
        id={this.props.name}
        className={`${this.props.className} ${displayError ? "error" : ""}`}
        style={this.props.style}
        disabled={this.props.disabled}
        name={this.props.name}
        options={this.props.options}
        onChange={e => this.inputChange(e)}
        inputProps={{ readOnly: true }}
        searchable={this.props.searchable}
        clearable={this.props.clearable}
        arrowRenderer={this.renderArrow}
        value={this.selectedOption}
        placeholder={this.placeholder}
        onBlur={this.handleOnBlur}
      />
    );
  }
}

export default SelectInput;
