import './styles.css';
import walletIcon from '../../assets/svg/wallet.svg';
import React, { useContext } from 'react';
import { ContextWalletBalance } from '../../utils/context-wallet';

import * as walletService from '../../services/wallet-services';

export default function WalletIcon() {

    const { contextWalletBalance, setContextWalletBalance } = useContext(ContextWalletBalance);

    setContextWalletBalance(walletService.getWallet().balance);

    return (

        <ul className="wallet-list">
            <li>
                <img className="calc-wallet" data-toggle="tooltip" data-placement="top" data-animation="" title="Balance" src={walletIcon} alt="Wallet"></img>
            </li>

            <li className="balance">
                {contextWalletBalance}
            </li>
        </ul>


    )
}