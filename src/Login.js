import './style/style.css';
import React from "react";
import ReactPlayer from 'react-player'

export default class Login extends React.Component {

  state = { // initial state
    loading: true, // waiting for our connection to the API to end
    token: null, // we don't know our token
    entities: [] // empty array that we will use to append our fetched data
  };

  async componentDidMount() {
    let url = "https://thebetter.bsgroup.eu/Authorization/SignIn";
    let response = await fetch(url, { // using fetch API instead of Axios, since that's what I'm most comfortable with
      method: 'POST', // we need to set a method, since this is a POST HTTP request
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Username": "", // empty string allows me to login as anonymous
        "Password": "", // empty string allows me to login as anonymous
      })
    });
    let data = await response.json(); 
    this.setState({token: data.AuthorizationToken.Token}) // loading the data has ended, so I can overwrite the initial state
    url = "https://thebetter.bsgroup.eu/Media/GetMediaList";
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      },
      body: JSON.stringify({
        "PageSize": 15,
        "PageNumber": 0,
        "FullTextSearch": "",
        "IncludeCount": false,
        "MediaListId": 2,
        "IncludeCategories": false,
        "IncludeMedia": false,
        "IncludeImages": false,
        "Categories": [99,101,6,43,27,100,28,5,1,7,3,2,8,32,15,10,11,9,12,14,16,19,20,22,24,25,134,26,29,30,31,33,34,35,36,37,49,38,39,40,41,42]
      })
    });
    data = await response.json();
    this.setState({entities: data.Entities, loading: false})
    this.state.entities.map(function(x) {console.log(x.Title, x.Description)}) // that's it for now - I can iterate over the entities and print out their titles and descriptions
  };

  render() {
    return(
      <div>
        {this.state.loading || !this.state.token ? (
          <div>loading...</div>
        ) : (
          <div>
            {this.state.token}
            {this.state.entities[0].Title}
          </div>
        )}
        <ReactPlayer controls={true} url="https://cd-stream-od.telenorcdn.net/tnfbaod/SF/585db4b3e4b09db0cf348a64/dash_a1.ism/playlist.mpd" />
      </div>

    );
  };

}