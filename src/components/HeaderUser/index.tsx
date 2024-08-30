import './styles.css';

import logo from '../../assets/svg/undraw_online_organizer_re_156n.svg'
import wallet from '../../assets/svg/wallet.svg';
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <header>
            <nav id="navbar" className="nav-main">
                <div className="nav-brand">
                    <img data-toggle="tooltip" data-placement="top" data-animation="" title="Home" src={logo} alt="wallet" />
                </div>

                <ul className="nav-list">
                    <li>
                        <img data-toggle="tooltip" data-placement="top" data-animation="" title="Balance" src={wallet} alt="calculator logo;" />
                    </li>

                    <li>
                        <Link to='/home'>Logout</Link>
                    </li>

                </ul>
            </nav>
        </header>
    );

}