import './styles.css';

import logo  from '../../assets/svg/undraw_push_notifications_re_t84m.svg'
import homeLogo from '../../assets/svg/home.svg';

import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <header>
            <nav id="navbar" className="nav-main">
                <div className="nav-brand">
                    <img data-toggle="tooltip" data-placement="top" data-animation="" title="Home" src={logo} alt="calculator logo;" />  
                </div>

                <ul className="nav-list">
                    
                    <li>
                        <Link to='/login'><img data-toggle="tooltip" data-placement="top" data-animation="" title="Login" src={homeLogo} alt="Logo" /></Link>
                    </li>

                </ul>
            </nav>
        </header>
    );

}