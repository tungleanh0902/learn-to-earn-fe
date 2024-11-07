import React, { useEffect } from 'react';
import './index.css'
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Earn from "./Earn";
import Learn from "./Learn";
import Leaderboard from "./Leaderboard";
import Wallet from "./Wallet";
import {createUserStore} from "./api/user.api";
import { createSocialTaskStore } from "./api/socialTask.api";
import WebApp from '@twa-dev/sdk'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import Layout from "./Components/Layout";
import { useState } from 'react';
import { wallets } from './constants';
// import Navigation from "./Navigation";

function App() {
  const doLogin = createUserStore(state => state.login)
  const getActiveTask = createSocialTaskStore(state => state.getActiveTasks)

  useEffect(() => {
    async function fetch() {
        let token = await doLogin(WebApp.initDataUnsafe.user.id.toString())
        await getActiveTask(token)
    }

    fetch()
  }, []);

  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
      uiPreferences={{theme: THEME.DARK}}
      walletsListConfiguration={wallets}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/devl2e_bot/dev/start'
      }}
    >
      <div className="App">
        {/* <Layout>
          <Navigation />
          <div className="bg-[#1e1e1e] flex flex-row justify-center w-full h-full">
            <div className="bg-[#1e1e1e] overflow-hidden w-[430px] h-[858px] relative">
              <footer className="relative w-[453px] h-28 top-[745px] bg-variable-collection-n-n justify-centery">
                <Navigation />
                test
              </footer>
            </div>
          </div>
        </Layout> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </Router>
      </div>
    </TonConnectUIProvider>
  );
}

export default App;