export default class Loader extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    dotWidth: PropTypes.number,
    dotRadius: PropTypes.number,
    fillColor: PropTypes.string,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    style: {
      width: "100%",
      height: "50px"
    },
    dotWidth: 40,
    dotRadius: 8,
    fillColor: "#ccc",
    className: ""
  };

  render() {
    return (
      <div className={this.props.className}>
        <svg
          version="1.1"
          id="form-loader"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="100px"
          y="100px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
          xmlSpace="preserve"
          style={this.props.style}
        >
          <circle
            fill={this.props.fillColor}
            stroke="none"
            cx="6"
            cy="50"
            r={this.props.dotRadius}
          >
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle
            fill={this.props.fillColor}
            stroke="none"
            cx={6 + this.props.dotWidth}
            cy="50"
            r={this.props.dotRadius}
          >
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle
            fill={this.props.fillColor}
            stroke="none"
            cx={6 + this.props.dotWidth * 2}
            cy="50"
            r={this.props.dotRadius}
          >
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      </div>
    );
  }
}
