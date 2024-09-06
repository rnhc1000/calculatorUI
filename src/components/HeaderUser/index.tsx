import './styles.css';

import logo from '../../assets/svg/undraw_online_organizer_re_156n.svg'
import { Link, useLocation } from 'react-router-dom';
import WalletIcon from '../WalletIcon';
import * as authService from '../../services/auth-services';
import * as walletService from '../../services/wallet-services';
import * as walletRepository from '../../localstorage/wallet-repository';
import { useContext, useState } from 'react';
import { WalletDTO } from '../../models/wallet';
import { ContextWalletBalance } from '../../utils/context-wallet';

export default function HeaderUser() {

    const location = useLocation();
    const [OK, setOK] = useState(true);
    const {setContextWalletBalance} = useContext(ContextWalletBalance);

    const initialState = { username: "", balance: "0.0" };
    const [balanceData] = useState<WalletDTO>(initialState);
    const userNameReturned = { ...authService.getAccessTokenPayload() };
    balanceData.username = userNameReturned.username ?? "nouser@found.com";

    if (OK) {

        walletService.findBalance({ ...balanceData })

            .then(response => {

                const check = response.data;
                
                walletRepository.save( {...check} );

                setOK(false);

            })

            .catch(() => {
                
                setOK(false);

            });

    }

    setContextWalletBalance(walletService.getWallet().balance);
    

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