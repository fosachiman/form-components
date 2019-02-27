class Checkbox extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired,
    formFunctions: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    checkedBox: PropTypes.node.isRequired,
    uncheckedBox: PropTypes.node.isRequired,

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
    this.props.formFunctions.initCheckboxes(this.props.name, this.initialValue);
  }

  inputChange = () => {
    this.props.formFunctions.updateCheckboxes(
      this.props.name,
      this.props.value,
      this.props.onChange
    );
  };

  isChecked = () => {
    if (this.props.formState.values[this.props.name])
      return this.props.formState.values[this.props.name].includes(
        this.props.value
      )
        ? true
        : false;
    else return false;
  };

  render() {
    const isChecked = this.isChecked();
    return (
      <div>
        <input
          type="checkbox"
          style={{ display: "none" }}
          disabled={this.props.disabled}
          name={this.props.name}
          onChange={() => this.inputChange()}
          value={this.props.value}
          checked={isChecked}
        />
        <div className={this.props.className} style={this.props.style}>
          {isChecked ? this.props.checkedBox : this.props.uncheckedBox}
        </div>
      </div>
    );
  }
}

export default Checkbox;
