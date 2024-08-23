import './styles.css';
import walletIcon from '../../assets/svg/wallet.svg';
import { useContext } from 'react';
import { ContextWalletBalance } from '../../utils/context-wallet';

export default function WalletIcon() {
    const { contextWalletBalance } = useContext(ContextWalletBalance);

    return (
        <><img src={walletIcon} alt="Wallet"></img>
            <div className="wallet-balance">{contextWalletBalance}</div>
        </>

    )
}