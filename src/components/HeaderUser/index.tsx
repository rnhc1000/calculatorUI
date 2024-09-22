import './styles.css';

import logo from '../../assets/svg/undraw_cloud_docs_re_xjht.svg'
import { Link, useLocation } from 'react-router-dom';
import WalletIcon from '../WalletIcon';


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
                        <WalletIcon />
                    </li>

                    {location.pathname === "/operations" &&

                        <li>
                            <Link to='/records'>Records</Link>
                        </li>
                        
                    }


                    {location.pathname === "/records" 

                    ?

                    (

                        <li>
                            <Link to='/operations'>Operations</Link>
                        </li>

                    )

                    :
                    
                    (

                        <li>
                            <Link to='/home'>Logout</Link>
                        </li>

                    )
                    }

                </ul>
            </nav>
        </header>
    );

}