# IDEAWORK FORM COMPONENTS

## What is this?

A collection of React Components that will make your life easier when creating forms. The goal is to combine ease of use with complete control and customizability. The library of components adheres to the idea of [controlled components](https://reactjs.org/docs/forms.html#controlled-components) where the state, which includes all form input values, is managed by a parent component and all properties and functions are passed to it's children for use but not manipulation. The components are designed to handle form logic and leaves all styling to the individual project developer.

## Getting started

Install the dependencies:

```
  npm install --save axios
  npm install --save react-select
```

Add the `form-components` folder to your project

## Before going further

If you have any questions, have any feature suggestions, or if anything is unclear in the documentation below please create an issue.

# So how does this thing work?

## Some initial things to know:

1.  The `FormContainer` component will wrap your entire form. It uses [render props](https://reactjs.org/docs/render-props.html) to pass the state and any utility functions directly to the children compoents - i.e. all of your form input components.
2.  Each input must be wrapped in a `Label Container`. This allows for custom designed components to be responsive to user inputs and behaviors (clicking/tapping).

3.  The library uses the native [input type="submit"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit) so any default behavior is adopted with the exception of page reload on submit. The default includes submit on `ENTER`

4.  All validation and middleware (text masking) is done using the formUtils.js file that is found in the folder. These functions are passed as `errorHandler` or `textFormatting` props to the components they will affect. Custom functions can be written within the formUtils.js file to account for any custom validation or masking.

5.  For any fields that require error handling, an `ErrorHandler` component with a matching `name` prop can be added to the JSX. It will take a required `errorHandler` prop which will check for errors on mount and each input change.

## An example before the explanation:

If you would like to work with this example form, clone or download this project and cd into the `sandbox` folder and `npm run start`. It's likely a better experience than staring at this wall of jsx.

```javascript
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
              <NewStandardInput
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
              <NewTextarea
                name="new-comments"
                formFunctions={formFunctions}
                formState={formState}
                textFormatting={formUtils.phoneMask}
                onChange={() => this.handleChange()}
              />
            </LabelContainer>
            <LabelContainer>
              <div>Comments Here</div>
              <NewTextarea
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
              <NewFileInput
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
              <SubmitHandler buttonText="Submit here my friend" />
            )}
          </form>
        )}
      />
    );
  }
}
export default VisitForm;
```

## State

The state object is passed from the container down to the form and is the center of truth for all child components of the form. Here is the format:

```
state = {
    posting: bool,
    success: bool,
    submitAttempted: bool,
    values: {inputName: "inputValue"},
    errors: {inputName: bool},
    postHeader: {
      "content-type": defaults to => "application/x-www-form-urlencoded"
    }
  }
```

# Let's break down the components:

## FormContainer.js

This component wraps all of your form inputs as well as any other markup and [renders a function as a child](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9) using the render prop. The render prop contains the children that will be rendered as a function and passes the data from the container like so:

```javascript
<FormContainer
  render={(formState, formFunctions) => (
    <form
      onSubmit={e =>
        formFunctions.handleSubmit(
          e,
          this.postURL
          // this.additionalData
        )
      }
    >
      //ALL OF YOUR FORM COMPONENTS
    </form>
  )}
/>
```

## REQUIRED

* A standard HTML `<form>` tag will wrap all of your form components.
* The `<form>` tag must include the below `onSubmit` function:

`formFunctions.handleSubmit(e, postURL, additionalData = {})`

* `e` is the event object passed through the submit handler, REQUIRED
* `postURL` is the URL the post request is sent to, REQUIRED
* `additionalData` is any additional data you would like to POST in a `dataToSend` object and/or a `googleAnalytics` object with a `gaLabel` key.

```
additionalData = {
  dataToSend: {
    inputName: "formDataSendToServer"
  },
  googleAnalytics: {
    gaLabel: "labelName" //type string, get this from David
  }
};
```

## Props

| Name   | Type     | Required | Default | Description                                                                             |
| ------ | -------- | -------- | ------- | --------------------------------------------------------------------------------------- |
| render | function | YES      | n/a     | renders the children components `(formState, formFunctions) => return child components` |

---

## LabelContainer.js

The label which must wrap each individual input field and `ErrorHandler` if included. Each field will be rendered as a child of the containing label which allows for the advantage of native HTML input behaviors on custom designed form fields. The label text itself is also a child of this component, which allows for custom positioning of the label text relative to the input field.

## Props

| Name      | Type   | Required | Default | Description                                                                                                                                                                                    |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children  | node   | YES      | n/a     | Accepts the input field and/or label text as children. The label text can be written as plain text or a node, as the `LabelContainer` under the hood is `<label>{this.props.children}</label>` |
| name      | string | NO       | ""      | the name passed to the `htmlFor` field in the `<label>`, must match `name` prop used in child input field                                                                                      |
| className | string | NO       | ""      | Appends a `className` to the label for CSS styles                                                                                                                                              |
| style     | object | NO       | {}      | Allows for inline styling of the label                                                                                                                                                         |

## StandardInput.js

Your basic `<input type="text" || "number"/>`

## Props

| Name           | Type          | Required | Default                               | Description                                                                                                                                                              |
| -------------- | ------------- | -------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name           | string        | YES      | n/a                                   | The key of the input field passed to the server                                                                                                                          |
| formState      | object        | YES      | n/a                                   | the `formState` passed through the render function of the `FormContainer`                                                                                                |
| formFunctions  | object        | YES      | n/a                                   | the `formFunctions` passed through the render function of the `FormContainer`                                                                                            |
| defaultValue   | string/number | NO       | ""                                    | an optional default value for the input on mount                                                                                                                         |
| textFormatting | function      | NO       | `(currentValue, previousValue) => {}` | A function that is used to format the user's input. See the `formUtils.js` for existing functions or create your own                                                     |
| disabled       | boolean       | NO       | false                                 | Can be used to disable a field from accepting user input                                                                                                                 |
| className      | string        | NO       | ""                                    | Appends a `className` to the input field for CSS styles                                                                                                                  |
| style          | object        | NO       | {}                                    | Allows for inline styling of an input field                                                                                                                              |
| type           | string        | NO       | "text"                                | The [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_<input>_types) of input, defaults to text but also accepts "number", "email", "password" |
| placeholder    | string        | NO       | ""                                    | Optional placeholder text to be used as a guide                                                                                                                          |
| onChange       | function      | NO       | () => {}                              | An optional callback function which will execute on any input change from the user                                                                                       |

---

## Textarea.js

A `textarea` input

## Props

| Name           | Type          | Required | Default                               | Description                                                                                                          |
| -------------- | ------------- | -------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| name           | string        | YES      | n/a                                   | The key of the input field passed to the server                                                                      |
| formState      | object        | YES      | n/a                                   | the `formState` passed through the render function of the `FormContainer`                                            |
| formFunctions  | object        | YES      | n/a                                   | the `formFunctions` passed through the render function of the `FormContainer`                                        |
| defaultValue   | string/number | NO       | ""                                    | an optional default value for the input on mount                                                                     |
| textFormatting | function      | NO       | `(currentValue, previousValue) => {}` | A function that is used to format the user's input. See the `formUtils.js` for existing functions or create your own |
| disabled       | boolean       | NO       | false                                 | Can be used to disable a field from accepting user input                                                             |
| className      | string        | NO       | ""                                    | Appends a `className` to the input field for CSS styles                                                              |
| style          | object        | NO       | {}                                    | Allows for inline styling of an input field                                                                          |
| onChange       | function      | NO       | () => {}                              | An optional callback function which will execute on any input change from the user                                   |

---

## FileInput.js

An input that accepts a file to be sent to the endpoint. The default style is ugly and inconsistent across browsesr, so this component allows for a custom styling

## Props

| Name           | Type     | Required | Default                               | Description                                                                                                                 |
| -------------- | -------- | -------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| name           | string   | YES      | n/a                                   | The key of the input field passed to the server                                                                             |
| formState      | object   | YES      | n/a                                   | the `formState` passed through the render function of the `FormContainer`                                                   |
| formFunctions  | object   | YES      | n/a                                   | the `formFunctions` passed through the render function of the `FormContainer`                                               |
| textFormatting | function | NO       | `(currentValue, previousValue) => {}` | A function that is used to format the user's input. See the `formUtils.js` for existing functions or create your own        |
| disabled       | boolean  | NO       | false                                 | Can be used to disable a field from accepting user input                                                                    |
| className      | string   | NO       | ""                                    | Appends a `className` to the input field for CSS styles                                                                     |
| style          | object   | NO       | {}                                    | Allows for inline styling of an input field                                                                                 |
| onChange       | function | NO       | () => {}                              | An optional callback function which will execute on any input change from the user                                          |
| children       | node     | NO       | n/a                                   | Gives the ability to add any additional elements inside of the styled input, for example a clickable file upload image icon |

---

## ErrorHandler.js

Provides both the error text and the function for which any input that needs error checking will be judged against. Basic error handling functions can be found in the `formUtils.js` file.

The ErrorHandler component will be wrapped within the `LabelContainer` along with the respective input field.

## Props

| Name          | Type        | Required | Default         | Description                                                                                                                                                                                                                                                             |
| ------------- | ----------- | -------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name          | string      | YES      | ""              | Must match the name of the input field that is being checked for errors by the ErrorHandler Component                                                                                                                                                                   |
| errorHandler  | function    | YES      | (value) => bool | Function that checks the condition of the current input and returns a bool based on whether it meets that condition. If any errorHandler within a form returns `true`, the form will not be POSTed to the server until all errorHandler conditions are met by the user. |
| formState     | object      | YES      | n/a             | the `formState` passed through the render function of the `FormContainer`                                                                                                                                                                                               |
| formFunctions | object      | YES      | n/a             | the `formFunctions` passed through the render function of the `FormContainer`                                                                                                                                                                                           |
| children      | string/node | NO       | ""              | The error message to be displayed upon a failed form submission attempt                                                                                                                                                                                                 |
| className     | string      | NO       | ""              | Appends a `className` to the error message for CSS styles                                                                                                                                                                                                               |
| style         | object      | NO       | {}              | Allows for inline styling of an error message                                                                                                                                                                                                                           |

---

## SelectInput.js

A `<select>` box using the `react-select` library.

## Props

| Name          | Type          | Required | Default  | Description                                                                                                                                                                  |
| ------------- | ------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name          | string        | YES      | n/a      | The key of the input field passed to the server                                                                                                                              |
| formState     | object        | YES      | n/a      | the `formState` passed through the render function of the `FormContainer`                                                                                                    |
| formFunctions | object        | YES      | n/a      | the `formFunctions` passed through the render function of the `FormContainer`                                                                                                |
| options       | array         | YES      | []       | An array of objects to be used as the options of the select dropdown box. Formatted as `options = [{ label: "label", value: "value"}, { label2: "label2", value2: "value2"}] |
| arrow         | node          | YES      | n/a      | The dropdown arrow to be used for the input box                                                                                                                              |
| disabled      | boolean       | NO       | false    | Can be used to disable a field from accepting user input                                                                                                                     |
| className     | string        | NO       | ""       | Appends a `className` to the input field for CSS styles                                                                                                                      |
| style         | object        | NO       | {}       | Allows for inline styling of an input field                                                                                                                                  |
| onChange      | function      | NO       | () => {} | An optional callback function which will execute on any input change from the user                                                                                           |
| placeholder   | string        | NO       | ""       | Optional placeholder text to be used as a guide                                                                                                                              |
| defaultValue  | string/number | NO       | ""       | an optional default value for the input on mount                                                                                                                             |
| searchable    | boolean       | NO       | false    | Can be used to make the select box searchable via user input                                                                                                                 |
| clearable     | boolean       | NO       | false    | Can be used to make the select box clearable via a close button                                                                                                              |

---

## Checkbox.js

A checkbox component that allows for custom styling. Each checkbox must be wrapped in a `LabelContainer` like all other input fields.

## Props

| Name          | Type       | Required | Default  | Description                                                                                                                       |
| ------------- | ---------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| name          | string     | YES      | n/a      | The key of the input field passed to the server. All checkboxes that belong to the same field group must all have the same `name` |
| formState     | object     | YES      | n/a      | the `formState` passed through the render function of the `FormContainer`                                                         |
| formFunctions | object     | YES      | n/a      | the `formFunctions` passed through the render function of the `FormContainer`                                                     |
| value         | string     | YES      | ""       | The value that is passed to the server if the checkbox is checked on submit.                                                      |
| checkedBox    | React Node | YES      | n/a      | A custom react node that will render if the checkbox is checked                                                                   |
| uncheckedBox  | React Node | YES      | n/a      | A custom react node that will render if the checkbox is NOT checked                                                               |
| disabled      | boolean    | NO       | false    | Can be used to disable a field from accepting user input                                                                          |
| className     | string     | NO       | ""       | Appends a `className` to the container of the custom checkbox component for CSS styles                                            |
| style         | object     | NO       | {}       | Allows for inline styling of the custom checkbox container                                                                        |
| checked       | boolean    | NO       | false    | Allows for a box to be checked by default                                                                                         |
| onChange      | function   | NO       | () => {} | An optional callback function which will execute on any input change from the user                                                |

---

## RadioButtons.js

A radio button component that allows for custom styling. Each radio button must be wrapped in a `LabelContainer` like all other input fields.

## Props

| Name            | Type       | Required | Default  | Description                                                                                                                       |
| --------------- | ---------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| name            | string     | YES      | n/a      | The key of the input field passed to the server. All checkboxes that belong to the same field group must all have the same `name` |
| formState       | object     | YES      | n/a      | the `formState` passed through the render function of the `FormContainer`                                                         |
| formFunctions   | object     | YES      | n/a      | the `formFunctions` passed through the render function of the `FormContainer`                                                     |
| value           | string     | YES      | ""       | The value that is passed to the server if the radio button is selected on submit.                                                 |
| radioSelected   | React Node | YES      | n/a      | A custom react node that will render if the radio button is selected                                                              |
| radioUnselected | React Node | YES      | n/a      | A custom react node that will render if the radio button is NOT selected                                                          |
| disabled        | boolean    | NO       | false    | Can be used to disable a field from accepting user input                                                                          |
| className       | string     | NO       | ""       | Appends a `className` to the container of the custom radio button component for CSS styles                                        |
| style           | object     | NO       | {}       | Allows for inline styling of the custom radio button container                                                                    |
| checked         | boolean    | NO       | false    | Allows for a radio button to be selected by default                                                                               |
| onChange        | function   | NO       | () => {} | An optional callback function which will execute on any input change from the user                                                |

---

## SubmitHandler.js

The component that will submit the form upon user input (click/tap). Can be rendered selectively based on form state.

## Props

| Name       | Type   | Required | Default | Description                                             |
| ---------- | ------ | -------- | ------- | ------------------------------------------------------- |
| buttonText | string | YES      | ""      | The text to be displayed within the submit handler      |
| className  | string | NO       | ""      | Appends a `className` to the input field for CSS styles |
| style      | object | NO       | {}      | Allows for inline styling of an input field             |

## Questions!?!!?

Submit an issue!
