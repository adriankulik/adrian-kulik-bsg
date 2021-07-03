import React from "react";

export default class Splash extends React.Component {

  state = { // initial state
    loading: true, // waiting for our connection to the API to end
    token: null // we don't know our token
  };

  async componentDidMount() {
    const url = "https://thebetter.bsgroup.eu/Authorization/SignIn";
    const response = await fetch(url, { // using fetch API instead of Axios, since that's what I'm most comfortable with
      method: 'POST', // we need to set a method, since this is a POST HTTP request
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Username": "", // empty string allows me to login as anonymous
        "Password": "", // empty string allows me to login as anonymous
        "Device": {
          "Name": "string",
          "PlatformCode": "string",
          "FirebaseToken": "string",
          "DpiCode": "string"
        }
      })
    });
    const data = await response.json();
    this.setState({token: data.AuthorizationToken.Token, loading: false}) // loading the data has ended, so I can overwrite the initial state
  }

  render() {
    return(
      <div>
        {this.state.token}
      </div>
    );
  };

}