import './style/style.css';
import { Link } from 'react-router-dom';

function SplashPage() {

    return (
        <div className="splash">
            <div className="splash__container">
                <div className="splash__container__logo">
                    My streaming service name
                </div>
                <Link to='/home'>
                    <button className="splash__container__button">
                        Login as anonymous
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default SplashPage;