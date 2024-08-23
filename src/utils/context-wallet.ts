import { createContext } from "react";

export type ContextWalletBalanceType = {

    contextWalletBalance: number;
    setContextWalletBalance: (contextWalletBalance : number) => void;

}

export const ContextWalletBalance = createContext<ContextWalletBalanceType>({

    contextWalletBalance: 0,
    setContextWalletBalance: () => {}
    
})