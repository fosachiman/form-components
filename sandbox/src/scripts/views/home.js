import VisitForm from "./VisitForm";

export default class Home extends React.Component {
  static propTypes = {
    page: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div style={{ margin: "50px" }}>
        <VisitForm />
      </div>
    );
  }
}
