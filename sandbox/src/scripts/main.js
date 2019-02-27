import App from "containers/App";
// import API from "utilities/API";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Main {
  // constructor() { this.api = new API({ base: API_PATH }) }

  // getComponent(component, nextState, cb) {
  //   require.ensure([], (require) => cb(null, require(`${ component }`).default));
  // }

  // async fetch(cb = () => {}) {
  //   // const { data: content } = await this.api.get('content?cacheBuster=1510685428649');
  //   // const { data: slides } = await this.api.get('slides?cacheBuster=1510685428649');
  //   // const data = _.mapValues(content, (pageData, pageId) => {
  //   //   return Object.assign({}, pageData, slides[pageId])
  //   // })
  //   // cb({data});
  //   return null;
  // }

  initialize() {
    ReactDOM.render(
      <Router>
        <Route
          render={props => {
            return <App {...props} />;
          }}
        />
      </Router>,
      document.querySelector(".wrapper")
    );
  }
}

new Main().initialize();
