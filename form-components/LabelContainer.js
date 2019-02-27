class LabelContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
  };

  render() {
    return (
      <label
        className={this.props.className}
        style={this.props.style}
        htmlFor={this.props.name}
      >
        {this.props.children}
      </label>
    );
  }
}

export default LabelContainer;
