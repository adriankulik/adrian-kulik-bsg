import LogoutIcon from './img/logout.svg'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navigation">
            <nav className="navigation__container">
                <Link to='/home' className="navigation__container__link">
                    <h1 className="navigation__container__logo">My BSG streaming service name</h1>
                </Link>
                <Link to='/' className="navigation__container__link">
                    <img src={LogoutIcon} alt="logout icon"></img>
                </Link>
            </nav>
        </div>
    )
}

export default Navbar;