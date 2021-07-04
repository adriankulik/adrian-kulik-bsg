import './style/style.css';
import ReactPlayer from 'react-player' // using a player from Pete Cook
import React from "react";
import LoadingIcon from './loading.svg'

export default class Player extends React.Component {

    state = { // initial state
      loading: true, // waiting for our connection to the API to end
      token: null, // we don't know our token
      url: null,
      title: null,
      description: null,
      id: null
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
      url = "https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo";
      response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        },
        body: JSON.stringify({
            "MediaId": 15,
            "StreamType": "TRIAL"
        })
      });
      data = await response.json();
      this.setState({
            url: data.ContentUrl,
            description: data.Description,
            title: data.Title,
            id: data.MediaId,
            loading: false
       });
    };
  
    render() {
        return (
            <div className="player">
                {this.state.loading || !this.state.token ? ( // using this as a loading indicator
                    <div className="player__loading">
                        <img className="player__loading__img" src={LoadingIcon} alt="loading icon"></img>
                    </div>
                    ) : (
                    <div className="player__container" key={this.state.id}>
                        <h2 className="player__title">{this.state.title}</h2>
                        <h3 className="player__description">{this.state.description}</h3>
                        <ReactPlayer controls={true} width={"100%"} height={"100%"} url={this.state.url} />
                    </div>
                )}
            </div>
        )
    };
}