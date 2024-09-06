import { WalletDTO } from "../models/wallet";
import { WALLET_KEY } from '../utils/system';

export function save(wallet: WalletDTO) {

    const saveWallet: string  = JSON.stringify(wallet);
    localStorage.setItem(WALLET_KEY, saveWallet)

}

export function get() : WalletDTO {

    const walletEmpty: string = '0';
    const walletBalance: string = localStorage.getItem(WALLET_KEY) ?? walletEmpty;
    const wallet = JSON.parse(walletBalance) as WalletDTO;
    
    return wallet;
}


export function clear() {

    const walletEmpty: string = '0';
    localStorage.setItem(WALLET_KEY, walletEmpty );

}