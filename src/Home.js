import './style/style.css';
import React from "react";
import LoadingIcon from './loading.svg'
import { Link } from 'react-router-dom';

export default class Home extends React.Component {

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
        "Categories": [99,101,6,43,27,100,28,5,1,7,3,2,8,32,15,10,11,9,12,14,16,19,20,22,24,25,134,26,29,30,31,33,34,35,36,37,49,38,39,40,41,42] // there surely is a way to list them all at once, but old school "*" that I know from SQL doesn't work here...
      })
    });
    data = await response.json();
    this.setState({entities: data.Entities, loading: false})
    console.log(this.state.entities);
    this.state.entities.forEach(function(x) {console.log(x.Title, x.Description)}) // using forEach() method instead of map(), because I don't want to return any value
  };

  render() {
    return(
      <div className="home">
        {this.state.loading || !this.state.token ? ( // using this as a loading indicator
          <div className="home__loading">
            <img className="home__loading__img" src={LoadingIcon} alt="loading icon"></img>
          </div>
        ) : (
          <div className="home__container">
            {this.state.entities.map(
              function(entity) {
                return (
                  <Link to='/player'>
                    <div className="home__entity">
                      <div className="home__entity__visual">
                        {/* <img className="home__entity__img" src={} alt="placeholder image"></img> */}
                        <p className="home__entity__img">Length: {entity.Duration}</p>
                      </div>
                      <div className="home__entity__text">
                        <h2 className="home__entity__title">{entity.Title}</h2>
                        <h3 className="home__entity__description">{entity.Description}</h3>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
        )}
      </div>
    );
  };
}