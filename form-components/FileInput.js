class FileInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired,
    formFunctions: PropTypes.object.isRequired,

    textFormatting: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
    children: PropTypes.node
  };

  constructor() {
    super();

    this.header = { "content-type": "multipart/form-data" };
  }

  componentDidMount() {
    this.props.formFunctions.changePostHeader(this.header);
    let hasError = false;
    this.props.formFunctions.updateField(this.props.name, this.initialValue);
    this.props.formFunctions.updateFieldErrors(this.props.name, hasError);
  }

  inputChange = e => {
    let value = e.target.value;
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
      <div>
        <input
          type="file"
          style={{ display: "none" }}
          disabled={this.props.disabled}
          name={this.props.name}
          onChange={e => this.inputChange(e)}
          value={this.props.formState.values[this.props.name] || ""}
        />
        <div
          className={`${this.props.className} ${displayError ? "error" : ""}`}
          style={this.props.style}
        >
          {this.props.formState.values[this.props.name] || ""}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default FileInput;
