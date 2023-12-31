import React, { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDialogProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { Route, Routes, useLocation } from "react-router-dom";
import MainContainer from "./components/home/MainContainer";
import Rewards from "./components/home/Rewards";
import Stake from "./components/home/Stake";
import Profile from "./components/home/Profile";
import Crate from "./components/home/Crater";
import Header from "./components/navs/Header";
import Footer from "./components/home/Footer";
import { AnimatePresence } from "framer-motion";
import Sweep from "./components/home/Sweep";
import Twitch from "./components/home/Twitch";
import Twitchhome from "./components/home/Twitchhome";
import Stacker from "./components/home/Stacker";
import Snapshot from "./components/home/Snapshot";
import Store from "./components/home/Store";
import Crater from "./components/home/Crater";


require("./App.css");

const App = () => {
  const location = useLocation();

  


  return (
    <div className="w-screen h-screen overflow-auto flex justify-center items-center">
      <>
        <Header />
        <Routes location={location} key={location.pathname}>
          {/*           <Route path="/*" element={<MainContainer />} />
           */}{" "}
          <Route path="/*" element={<Rewards />} />
          <Route path="/store" element={<Store />} />
          <Route path="/vault" element={<Stake />} />
          <Route path="/crates" element={<Crate />} />
          <Route path="/sweep2earn" element={<Sweep />} />
          <Route path="/snapshot" element={<Snapshot />} />
          <Route path="/watch2earn" element={<Twitchhome/>} />
          <Route path="/staker" element={<Stacker/>} />
          <Route path="/crate" element={<Crater/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
        <Footer />
      </>
    </div>
  );
};
export default App;
