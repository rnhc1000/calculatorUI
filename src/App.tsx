import React from "react";

import Home from "./routes/Home";
import Login from './routes/Login';
import ScrollToTop from './utils/scrollTop';

import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {


  const MemoizedHome = React.memo(Home);
  const MemoizedLogin = React.memo(Login);

  return (
    <BrowserRouter>
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<MemoizedHome />}> </Route>
          <Route index element={<MemoizedHome />}></Route>
          <Route path="/login" element={<MemoizedLogin />}></Route>

        </Routes>  
      </BrowserRouter>
  )
}