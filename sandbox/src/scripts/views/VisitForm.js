// core form components:
import * as formUtils from "../../../../form-components/formUtils";
import FormContainer from "../../../../form-components/FormContainer";
import StandardInput from "../../../../form-components/StandardInput";
import LabelContainer from "../../../../form-components/LabelContainer";
import ErrorHandler from "../../../../form-components/ErrorHandler";
import SubmitButton from "../../../../form-components/SubmitButton";
import Textarea from "../../../../form-components/Textarea";
import SelectInput from "../../../../form-components/SelectInput";
import FileInput from "../../../../form-components/FileInput";
import RadioButton from "../../../../form-components/RadioButton";
import Checkbox from "../../../../form-components/Checkbox";
// demonstration only components:
import Loader from "../../../../form-components/Loader";
import CheckedBox from "../widgets/CheckedBox";
import UnCheckedBox from "../widgets/UnCheckedBox";
import DownArrow from "../widgets/DownArrow";
// gaLabel: "SignUp"

class VisitForm extends React.Component {
  constructor() {
    super();

    this.postURL = "postURL";

    // this.additionalData = {
    //   dataToSend: {
    //     inputName: "formDataSendToServer"
    //   },
    //   googleAnalytics: {
    //     gaLabel: "labelName" //type string, get this from David
    //   }
    // };

    this.times = [
      { label: "10:00am", value: "10:00am" },
      { label: "11:00am", value: "11:00am" },
      { label: "1:00pm", value: "1:00pm" },
      { label: "2:00pm", value: "2:00pm" },
      { label: "3:00pm", value: "3:00pm" },
      { label: "4:00pm", value: "4:00pm" },
      { label: "5:00pm", value: "5:00pm" }
    ];
  }

  handleChange = () => {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    this.setState({ background: `rgb(${red}, ${green}, ${blue})` });
  };

  state = {
    background: "white"
  };

  render() {
    return (
      <FormContainer
        render={(formState, formFunctions) => (
          <form
            style={{ background: this.state.background }}
            onSubmit={e =>
              formFunctions.handleSubmit(
                e,
                this.postURL
                // this.additionalData
              )
            }
          >
            <LabelContainer>
              <div>New Name</div>
              <StandardInput
                name="new-name"
                defaultValue="Jason"
                formFunctions={formFunctions}
                formState={formState}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <ErrorHandler
              name="new-name"
              formState={formState}
              errorHandler={formUtils.validateNotBlank}
              formFunctions={formFunctions}
            >
              This is wrong
            </ErrorHandler>
            <LabelContainer>
              <div>Comments Here</div>
              <Textarea
                name="new-comments"
                formFunctions={formFunctions}
                formState={formState}
                textFormatting={formUtils.phoneMask}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <LabelContainer>
              <div>Comments Here</div>
              <Textarea
                name="old-comments"
                formFunctions={formFunctions}
                formState={formState}
                textFormatting={formUtils.phoneMask}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <LabelContainer>
              <div>Select Box</div>
              <SelectInput
                name="new-select"
                options={this.times}
                formFunctions={formFunctions}
                formState={formState}
                placeholder="Select Time"
                arrow={<DownArrow />}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <LabelContainer>
              <div>Upload a file</div>
              <FileInput
                name="upload-file"
                formFunctions={formFunctions}
                formState={formState}
                style={{ height: "50px", border: "1px solid black" }}
              />
            </LabelContainer>
            <LabelContainer>
              <div>Cool</div>
              <RadioButton
                name="isCool"
                formFunctions={formFunctions}
                formState={formState}
                value="cool"
                radioSelected={<CheckedBox />}
                radioUnselected={<UnCheckedBox />}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <LabelContainer>
              <div>Not Cool</div>
              <RadioButton
                name="isCool"
                formFunctions={formFunctions}
                formState={formState}
                value="not-cool"
                radioSelected={<CheckedBox />}
                radioUnselected={<UnCheckedBox />}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <LabelContainer>
              <div>A</div>
              <Checkbox
                name="which-one"
                formFunctions={formFunctions}
                formState={formState}
                value="A"
                checkedBox={<CheckedBox />}
                uncheckedBox={<UnCheckedBox />}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <LabelContainer>
              <div>B</div>
              <Checkbox
                name="which-one"
                formFunctions={formFunctions}
                formState={formState}
                value="B"
                checked={true}
                checkedBox={<CheckedBox />}
                uncheckedBox={<UnCheckedBox />}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <LabelContainer>
              <div>C</div>
              <Checkbox
                name="which-one"
                formFunctions={formFunctions}
                formState={formState}
                value="C"
                checkedBox={<CheckedBox />}
                uncheckedBox={<UnCheckedBox />}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <ErrorHandler
              name="isCool"
              formState={formState}
              errorHandler={formUtils.validateNotBlank}
              formFunctions={formFunctions}
            >
              You did not pick a radio button buddy!
            </ErrorHandler>
            {formState.posting ? (
              <Loader className="loader" fillColor="#BBB" />
            ) : (
              <SubmitButton buttonText="Submit here my friend" />
            )}
          </form>
        )}
      />
    );
  }
}
export default VisitForm;
