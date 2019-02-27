import axios from "axios";

class FormContainer extends React.Component {
  static propTypes = {
    render: PropTypes.func,
    callback: PropTypes.func
  };

  static defaultProps = {
    callback: () => {}
  };

  constructor() {
    super();

    this.formFunctions = {
      updateField: this.updateField,
      updateFieldErrors: this.updateFieldErrors,
      handleSubmit: this.handleSubmit,
      changePostHeader: this.changePostHeader,
      initRadios: this.initRadios,
      initCheckboxes: this.initCheckboxes,
      updateCheckboxes: this.updateCheckboxes
    };
  }

  state = {
    posting: false,
    success: false,
    submitAttempted: false,
    values: {},
    errors: {},
    postHeader: {
      "content-type": "application/json"
    }
  };

  changePostHeader = newHeader => {
    this.setState({ postHeader: newHeader });
  };

  updateField = (fieldName, fieldValue, cb) => {
    this.setState(prevState => {
      return { values: { ...prevState.values, [fieldName]: fieldValue } };
    }, () => (cb ? cb() : null));
  };

  updateFieldErrors = (fieldName, hasError) => {
    this.setState(prevState => {
      return { errors: { ...prevState.errors, [fieldName]: hasError } };
    });
  };

  initRadios = (fieldName, fieldValue) => {
    this.setState(prevState => {
      if (!prevState.values.hasOwnProperty(fieldName) || fieldValue)
        return { values: { ...prevState.values, [fieldName]: fieldValue } };
      else return null;
    });
  };

  initCheckboxes = (fieldName, fieldValue) => {
    this.setState(prevState => {
      if (!prevState.values.hasOwnProperty(fieldName) || fieldValue) {
        const existingState = prevState.values[fieldName] || [];
        existingState.push(fieldValue);
        const checkedBoxes = existingState.filter(value => value);
        return {
          values: {
            ...prevState.values,
            [fieldName]: [...checkedBoxes]
          }
        };
      } else return null;
    });
  };

  updateCheckboxes = (fieldName, fieldValue, cb) => {
    this.setState(prevState => {
      const existingState = prevState.values[fieldName];
      if (existingState.includes(fieldValue)) {
        const fieldIndex = existingState.indexOf(fieldValue);
        existingState.splice(fieldIndex, 1);
      } else existingState.push(fieldValue);
      const checkedBoxes = existingState.filter(value => value);
      return {
        values: {
          ...prevState.values,
          [fieldName]: [...checkedBoxes]
        }
      };
    }, () => (cb ? cb() : null));
  };

  checkForErrors() {
    return Object.values(this.state.errors).includes(true);
  }

  handleSubmit = (
    e,
    postURL,
    { dataToSend = {}, googleAnalytics = {} } = {}
  ) => {
    e.preventDefault();
    if (!this.state.posting) {
      const errors = this.checkForErrors();
      if (errors) {
        this.setState({ submitAttempted: true });
        this.setState({ posting: false });
      } else {
        const formData = this.packageFormData({
          ...this.state.values,
          ...dataToSend
        });
        if (googleAnalytics) this.sendToGoogle(googleAnalytics);
        this.submitData(postURL, formData);
      }
    }
  };

  packageFormData = additionalData => {
    const formData = new FormData();
    const data = {
      ...this.state.values,
      path: window.location.href,
      ...additionalData
    };
    Object.keys(data).forEach(field => {
      formData.append(field, data[field]);
    });
    return data;
  };

  sendToGoogle = ({ gaLabel }) => {
    if (gaLabel) {
      try {
        ga("send", {
          hitType: "event",
          eventCategory: "Form",
          eventAction: "Completion",
          eventLabel: gaLabel,
          eventValue: 0
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  submitData = (postURL, formData) => {
    this.posting();
    axios
      .post(postURL, formData, { headers: this.state.postHeader })
      .then(response => {
        console.log(response);
        //check and make sure data submits successfully and then...
        this.formSuccess();
      })
      .catch(() => {
        this.setState({ posting: false });
      });
  };

  posting = () => {
    this.setState({ posting: true });
  };

  formSuccess = () => {
    this.setState(prevState => {
      const values = Object.getOwnPropertyNames(prevState.values).reduce(
        (accum, property) => {
          return { ...accum, [property]: "" };
        },
        {}
      );
      return {
        ...prevState,
        posting: false,
        success: true,
        values
      };
    }, this.props.callback);
  };

  render() {
    return this.props.render(this.state, this.formFunctions);
  }
}

export default FormContainer;
