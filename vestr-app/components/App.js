import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { StackNavigation } from "@expo/ex-navigation";
import Router from "../navigation/Router";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";
import { authActions } from "../state/actions";

class App extends React.Component {
  componentWillMount() {
    this.props.isLoggedIn();
  }

  render() {
    const initialRoute = Router.getRoute("rootNavigation");

    if (this.props.auth.isLoading) {
      return <Loader />;
    }

    if (this.props.auth.loggedIn) {
      return <StackNavigation id="root" initialRoute={initialRoute} />;
    }

    return <LoginForm />;
  }
}

App.propTypes = {
  auth: PropTypes.object,
  isLoggedIn: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth
});

const isLoggedIn = authActions.isLoggedIn;

export default connect(mapStateToProps, { isLoggedIn })(App);
