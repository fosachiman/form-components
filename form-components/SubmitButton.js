class SubmitButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    buttonText: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <button
          type="submit"
          className={this.props.className}
          style={this.props.style}
        >
          {this.props.buttonText}
        </button>
        <input type="submit" style={{ visibility: "hidden" }} />
      </div>
    );
  }
}

export default SubmitButton;
