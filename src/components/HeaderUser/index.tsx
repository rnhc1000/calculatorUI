import './styles.css';

import logo from '../../assets/svg/undraw_online_organizer_re_156n.svg'
import wallet from '../../assets/svg/wallet.svg';
import { Link, useLocation } from 'react-router-dom';

export default function HeaderUser() {

    const location = useLocation();

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

                    {location.pathname === "/operations" &&

                        <li>
                            <Link to='/records'>Records</Link>
                        </li>
                    }


                    {location.pathname === "/records" ? (

                        <li>
                            <Link to='/operations'>Operations</Link>
                        </li>
                    ) : (
                    

                    <li>
                        <Link to='/home'>Logout</Link>
                    </li>
                    )}

                </ul>
            </nav>
        </header>
    );

}