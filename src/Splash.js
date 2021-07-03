import './style/style.css';
import { Link } from 'react-router-dom';
import Logo from './logo.svg'

function SplashPage() {

    return (
        <div className="splash">
            <div className="splash__container">
                <div className="splash__container__logo">
                    <img src={Logo} alt="logo"></img>
                </div>
                <button className="splash__container__button">
                    <Link to='/home'>Login as anonymous</Link>
                </button>
            </div>
        </div>
    )
}

export default SplashPage;