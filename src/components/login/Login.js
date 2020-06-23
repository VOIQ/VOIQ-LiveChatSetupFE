import React from "react";
import {Redirect} from "react-router-dom";

import "./Login.css";

class Login extends React.Component {
  state = {
    loggedIn: false
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/first" />;
    } else {
      return (
        <div className="ui middle aligned three column centered grid login-grid">
          <div className="column">
            <div className="ui segment voiq-login-segment">
              <div className="ui one column grid">
                <div className="column center aligned">
                  <img className="voiq-logo" src="/voiq-logo-blue.png" alt="VOIQ Logo" />
                </div>
                <div className="column center aligned">
                  Sign in, or create an account
                </div>
                <div className="column">
                  <form className="ui form" onSubmit={() => this.setState({loggedIn: true}) }>
                    <div className="field">
                      <label>Email</label>
                      <input type="text" name="first-name" placeholder="First Name" />
                    </div>

                    <div className="field">
                      <label>Password</label>
                      <input type="text" name="last-name" placeholder="Last Name" />
                    </div>
                    <button className="ui button voiq-sign-in-button" type="submit">LOG IN</button>
                    <button className="ui button" type="button">SIGN UP</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;