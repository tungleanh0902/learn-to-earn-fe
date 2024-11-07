import React, { useEffect, useState } from 'react';
import './index.css'
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Earn from "./Earn";
import Learn from "./Learn";
import Leaderboard from "./Leaderboard";
import Wallet from "./Wallet";
import { createUserStore } from "./api/user.api";
import { createSocialTaskStore } from "./api/socialTask.api";
import WebApp from '@twa-dev/sdk'
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import Layout from "./Components/Layout";
import { wallets } from './constants';
import Navigation from './Components/Navigation';

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
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={wallets}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/devl2e_bot/dev/start'
      }}
    >
      <Router>
        <div className="App flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/earn" element={<Earn />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/wallet" element={<Wallet />} />
            </Routes>
          </div>
          <div className="footer">
            <Navigation />
          </div>
        </div>
      </Router>
    </TonConnectUIProvider >

  );
}

export default App;