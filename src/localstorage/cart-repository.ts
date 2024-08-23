import { WalletDTO, WalletOperationsDTO } from "../models/wallet";
import { WALLET_KEY } from '../utils/system';

export function save(wallet: WalletDTO) {

    const saveWallet: string  = JSON.stringify(wallet);
    localStorage.setItem(WALLET_KEY, saveWallet)

}

export function get() : WalletDTO {

    const walletEmpty: string = '{"items":[]}';
    const walletBalance: string = localStorage.getItem(WALLET_KEY) ?? walletEmpty;
    const obj = JSON.parse(walletBalance) as WalletDTO;
    const wallet  = new WalletDTO();
    obj.operations.forEach(operation => {
        wallet.operations.push(new WalletOperationsDTO(operation.operationId, operation.cost));
    })
    return wallet;

}


export function clear() {

    const walletEmpty: string = '{"items":[]}';
    localStorage.setItem(WALLET_KEY, walletEmpty );

}