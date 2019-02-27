class ErrorHandler extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    errorHandler: PropTypes.func.isRequired,
    formState: PropTypes.object.isRequired,
    formFunctions: PropTypes.object.isRequired,

    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    className: "error-message"
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.formState.values.hasOwnProperty(this.props.name) &&
      this.props.formState.values[this.props.name] !==
        nextProps.formState.values[this.props.name]
    )
      this.checkForErrors(nextProps);
  }

  checkForErrors = nextProps => {
    let hasError = this.props.formState.errors[this.props.name] || false;
    hasError = !this.props.errorHandler(
      nextProps.formState.values[this.props.name]
    );
    this.props.formFunctions.updateFieldErrors(this.props.name, hasError);
  };

  render() {
    return this.props.formState.errors[this.props.name] &&
      this.props.formState.submitAttempted &&
      !this.props.formState.success ? (
      <div className={this.props.className} style={this.props.style}>
        {this.props.children}
      </div>
    ) : null;
  }
}

export default ErrorHandler;
