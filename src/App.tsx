import React, { useEffect, useState } from "react";

import Home from "./routes/Home";
import Login from './routes/Login';
import Operation from "./routes/Operation";
import Records from "./routes/Records";
import ScrollToTop from './utils/scrollTop';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessTokenPayloadDTO } from "./models/auth";
import * as authService from './services/auth-services';
import * as  walletService from './services/wallet-services';
import { ContextToken } from "./utils/context-token";
import { ContextWalletBalance } from "./utils/context-wallet";

export default function App() {


  const MemoizedHome = React.memo(Home);
  const MemoizedLogin = React.memo(Login);
  const MemoizedOperation = React.memo(Operation);
  const MemoizedRecords = React.memo(Records);
  
  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();
  const [contextWalletBalance, setContextWalletBalance] = useState<string>("0");

  useEffect(() => {
    setContextWalletBalance(walletService.getWallet().balance);

    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);

  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
      <ContextWalletBalance.Provider value={{ contextWalletBalance, setContextWalletBalance }}>

        <BrowserRouter>
          <ScrollToTop />
          <Routes>

            <Route path="/home" element={<MemoizedHome />}> </Route>
            <Route index element={<MemoizedHome />}></Route>
            <Route path="/login" element={<MemoizedLogin />}></Route>
            <Route path="/operations" element={<MemoizedOperation />}></Route>
            <Route path="/records" element={<MemoizedRecords />}></Route>

          </Routes>
        </BrowserRouter>
      </ContextWalletBalance.Provider>
    </ContextToken.Provider>
  )
}