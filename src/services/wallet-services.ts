import { WalletDTO  }  from '../models/wallet';
import * as walletRepository from '../localstorage/wallet-repository';
import * as authService from './auth-services';
import { AxiosRequestConfig } from 'axios';
import { requestBackEnd } from '../utils/requests';

export function saveWallet(wallet: WalletDTO) {

    walletRepository.save(wallet);
}

export function getWallet(): WalletDTO{ 

    return walletRepository.get();
}

export function clearWallet() {

    walletRepository.clear();

}

export function findBalance(bodyData: WalletDTO) {

    const headers = {

        "Content-Type": "application/json",
        Authorization: "Bearer " + authService.getAccessToken()

    }

    const requestBody = { ...bodyData }

    const config: AxiosRequestConfig = {
        
        method: "POST",
        url: "/balance",
        withCredentials: true,
        data: requestBody,
        headers: headers

    }

    return requestBackEnd(config);
}