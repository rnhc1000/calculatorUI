import { createContext } from "react";

export type ContextWalletBalanceType = {

    contextWalletBalance: string;
    setContextWalletBalance: (contextWalletBalance : string) => void;

}

export const ContextWalletBalance = createContext<ContextWalletBalanceType>({

    contextWalletBalance: "0",
    setContextWalletBalance: () => {}
    
})