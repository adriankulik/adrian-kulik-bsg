import './style/style.css';
import Home from './Home';
import SplashPage from './Splash';
import NotFound from './NotFound';
import Player from './Player'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path='/'>
                        <SplashPage />
                    </Route>
                    <Route exact path='/home'>
                        <Home />
                    </Route>
                    <Route exact path='/player'>
                        <Player />
                    </Route>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App