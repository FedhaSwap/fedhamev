import type, { FC, PropsWithChildren } from "react";
import { OrderlyConfigProvider } from "@orderly.network/hooks";


import Home from './pages/website/home'
import About from './pages/website/about'
import Swap from './pages/account/swap'
import Test from './pages/website/test'
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';


const brokerId = "orderly";





 const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <OrderlyConfigProvider brokerId={brokerId} networkId="testnet">
       <BrowserRouter>
     <Routes>
       <Route path="/"  element={<Home/>} />
       <Route path="/about" element={<About/>} />
       <Route path="/swap" element={<Swap/>}/>
       <Route path="/test" element={<Test/>}/>
     </Routes>
     
    </BrowserRouter>

    </OrderlyConfigProvider>
  );
};

export default App
