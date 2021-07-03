import './style/style.css';
import Login from './Login';
import SplashPage from './Splash';
import NotFound from './NotFound';
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
                        <Login />
                    </Route>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App