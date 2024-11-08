import React, { useEffect, useState } from 'react';
import './index.css'
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Earn from "./Earn";
import Learn from "./Learn";
import Leaderboard from "./Leaderboard";
import Wallet from "./Wallet";
import { createUserStore } from "./api/user.api";
import { createSocialTaskStore } from "./api/socialTask.api";
import { createQuizzStore } from "./api/quizz.api";
import { createSeasonBadgeStore } from "./api/seasonBadge.api";
import WebApp from '@twa-dev/sdk'
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import Layout from "./Components/Layout";
import { wallets } from './constants';
import Navigation from './Components/Navigation';

function App() {
  const doLogin = createUserStore(state => state.login)
  const getActiveTask = createSocialTaskStore(state => state.getActiveTasks)
  const getRandomLesson = createQuizzStore(state => state.getRandomLesson)
  const getRandomLessonForCampaign = createQuizzStore(state => state.getRandomLessonForCampaign)
  const checkThisSeasonBadge = createSeasonBadgeStore(state => state.checkThisSeasonBadge)
  const currentSeasonBadge = createSeasonBadgeStore(state => state.currentSeasonBadge)
  const checkCheckInYesterday = createUserStore(state => state.checkCheckInYesterday)

  const [active, setActive] = useState(0);
  const [isCampaign, setIsCampaign] = useState(false)
  
  const handleClickActive = (index) => {
      setActive(index);
  };

  useEffect(() => {
    async function fetch() {
      console.log(WebApp.initDataUnsafe.user.id.toString());
      let token = await doLogin(WebApp.initDataUnsafe.user.id.toString())
      getActiveTask(token)
      getRandomLesson(token)
      let gotIt = await checkThisSeasonBadge(token)
      if (gotIt.tokenId != null) {
        getRandomLessonForCampaign(token)
      }
      currentSeasonBadge()
      checkCheckInYesterday()
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
              <Route path="/" element={
                <Home 
                  active={active}
                  handleClickActive={handleClickActive}
                />
              } />
              <Route path="/earn" element={
                <Earn
                  active={active}
                  handleClickActive={handleClickActive}
                  setIsCampaign={setIsCampaign}
                />
              } />
              <Route path="/learn" element={<Learn
                  isCampaign={isCampaign}
                />
              } />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/wallet" element={<Wallet />} />
            </Routes>
          </div>
          <div className="footer">
            <Navigation
              active={active}
              handleClickActive={handleClickActive}
              setIsCampaign={setIsCampaign}
            />
          </div>
        </div>
      </Router>
    </TonConnectUIProvider >

  );
}

export default App;