import React from "react";

import Home from "./routes/Home";
import Login from './routes/Login';
import Operation from "./routes/Operation";
import Records from "./routes/Records";
import ScrollToTop from './utils/scrollTop';

import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {


  const MemoizedHome = React.memo(Home);
  const MemoizedLogin = React.memo(Login);
  const MemoizedOperation = React.memo(Operation);
  const MemoizedRecords = React.memo(Records)

  return (
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
  )
}