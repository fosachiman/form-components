class RadioButton extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired,
    formFunctions: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    radioSelected: PropTypes.node.isRequired,
    radioUnselected: PropTypes.node.isRequired,

    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    checked: PropTypes.bool,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.initialValue = props.checked ? props.value : "";
  }

  componentDidMount() {
    this.props.formFunctions.initRadios(this.props.name, this.initialValue);
  }

  inputChange = e => {
    let value = e.target.checked ? this.props.value : "";
    this.props.formFunctions.updateField(
      this.props.name,
      value,
      this.props.onChange
    );
  };

  render() {
    return (
      <div>
        <input
          type="radio"
          style={{ display: "none" }}
          disabled={this.props.disabled}
          name={this.props.name}
          onChange={e => this.inputChange(e)}
          value={this.props.value}
          checked={
            this.props.formState.values[this.props.name] === this.props.value
              ? true
              : false
          }
        />
        <div className={this.props.className} style={this.props.style}>
          {this.props.formState.values[this.props.name] === this.props.value
            ? this.props.radioSelected
            : this.props.radioUnselected}
        </div>
      </div>
    );
  }
}

export default RadioButton;
