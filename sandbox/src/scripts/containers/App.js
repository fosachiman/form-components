// import browser from "bowser";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import InvalidBrowser from "utilities/InvalidBrowser/InvalidBrowser";
// // import AccessibleHeader from "utilities/Accessible/Header";
// import Footer from "partials/Footer";
// import Header from "partials/Header";
// import sleep from "utilities/sleep";
// import APP_CONFIG from "config/appConfig";
// import appContextProvider from "containers/appContextProvider";
// import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../views/home";

class App extends React.Component {
  // static propTypes = {
  //   children: PropTypes.node,
  //   match: PropTypes.object,
  //   location: PropTypes.object,
  //   history: PropTypes.object
  // };

  // static contextTypes = {
  //   content: PropTypes.object
  // };

  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     accessible: false
  //   };
  //   this.routes = this.buildRoutes();
  //   this.pageChangeRoutine(props, context);
  // }

  // componentDidMount() {
  //   if (this.isValidBrowser()) {
  //     sleep(APP_CONFIG.loadingDuration).then(() => {
  //       this.hideLoader();
  //     });
  //   } else {
  //     this.hideLoader();
  //   }
  // }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   const { location: { pathname } } = nextProps;
  //   this.trackPageView(pathname);
  //   if (
  //     this.props.location.pathname !== nextProps.location.pathname ||
  //     this.props.location.search !== nextProps.location.search
  //   ) {
  //     this.pageChangeRoutine(nextProps, nextContext);
  //   }
  // }

  // buildRoutes() {
  //   // - creates new require context for 'views' directory
  //   // - requires every js file in view
  //   const requireViews = require.context(
  //     "views",
  //     true,
  //     /^(.*\.(js$))[^.]*$/gim
  //   );
  //   const viewPaths = requireViews.keys();
  //   const viewComponents = viewPaths.map(path => {
  //     return requireViews(path).default;
  //   });

  //   // generate object of shape {'path relative to views directory': 'View Component'}
  //   //   eg: {'./home.js': 'Home Class'}
  //   const viewComponentsWithKeys = _.zipObject(viewPaths, viewComponents);
  //   // console.log(viewComponentsWithKeys);

  //   // - create routes/redirects for every page object in content from CMS
  //   // - select component for route by mapping page.TEMPLATE to paths relative to views/
  //   const routesAndRedirects = _.map(this.context.content.all, page => {
  //     if (page.template === "redirect") {
  //       return (
  //         <Route
  //           exact
  //           key={page.id}
  //           path={page.path}
  //           render={() => {
  //             // may need to set window.location if external link
  //             return <Redirect to={page.link} />;
  //           }}
  //         />
  //       );
  //     }
  //     const Component =
  //       viewComponentsWithKeys[`./${page.template.toLowerCase()}.js`] ||
  //       viewComponentsWithKeys["./default.js"];
  //     return (
  //       <Route
  //         exact
  //         key={page.id}
  //         path={page.path}
  //         render={props => {
  //           return <Component page={page} {...this.props} {...props} />;
  //         }}
  //       />
  //     );
  //   });

  //   const redirectAllElse = (
  //     <Route
  //       path="/"
  //       key="redirectAllElse"
  //       render={() => {
  //         return <Redirect to="/" />;
  //       }}
  //     />
  //   );

  //   return [...routesAndRedirects, redirectAllElse];
  // }

  // hideLoader() {
  //   document.querySelector(".site-loader").className += " site-loader--loaded";
  // }

  // isValidBrowser() {
  //   return !(browser.msie && parseInt(browser.version) < 11);
  // }

  // formatPageClass() {
  //   const { content } = this.context;
  //   const className = content.forCurrentPage.replace(/\//g, "-").slice(1);
  //   return className === "" ? "home" : className;
  // }
  // pageChangeRoutine(props, context) {
  //   const pageTitleFromContent = context.content.byPath(props.location.pathname)
  //     .pagetitle;
  //   document.title =
  //     pageTitleFromContent || context.content.byPath("/").pagetitle;
  //   // if (window.ga) {
  //   //   ga("send", "pageview", { page: props.location.pathname });
  //   // }
  //   window.scrollTo(0, 0);
  // }
  // // setPageTitle() {
  // //   const { content } = this.context;
  // //   document.title = content.forCurrentPage.PAGETITLE;
  // // }

  // trackPageView(page) {
  //   const { title } = document;
  //   if (window.ga) {
  //     ga("send", "pageview", { page, title });
  //   }
  // }

  // toggleAccessible = e => {
  //   e.preventDefault();
  //   this.setState({ accessible: !this.state.accessible }, () => {
  //     document.querySelector("html").classList.toggle("accessible");
  //   });
  // };

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
