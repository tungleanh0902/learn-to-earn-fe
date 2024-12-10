import React, { useEffect, useState } from 'react';
import './index.css'
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Earn from "./Earn";
import Learn from "./Learn";
import Leaderboard from "./Leaderboard";
import Shop from './Shop';
import DropGame from './DropGame';
import MeanMatchingGame from './MeanMatchingGame';

import { createUserStore } from "./api/user.api";
import { createSocialTaskStore } from "./api/socialTask.api";
import { createQuizzStore } from "./api/quizz.api";
import { createSeasonBadgeStore } from "./api/seasonBadge.api";
import { createVoucherStore } from "./api/voucher.api";
import WebApp from '@twa-dev/sdk'
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { wallets } from './constants';
import Navigation from './Components/Navigation';

import { createAppKit } from '@reown/appkit/react'
import { defineChain } from '@reown/appkit/networks'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
const queryClient = new QueryClient()
// Define the custom network
const kaia = defineChain({
  id: 1001,
  caipNetworkId: 'eip155:1001',
  chainNamespace: 'eip155',
  name: 'Kaia',
  nativeCurrency: {
    decimals: 18,
    name: 'Kaia',
    symbol: 'KAIA',
  },
  rpcUrls: {
    default: {
      http: ['https://kaia-kairos.blockpi.network/v1/rpc/public'],
      webSocket: ['wss://public-en-kairos.node.kaia.io/ws'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://kairos.kaiascope.com/' },
  },
})

const projectId = import.meta.env.VITE_PROJECT_ID
const wagmiAdapter = new WagmiAdapter({
  networks: [kaia],
  projectId,
  ssr: true
})

// 3. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [kaia],
  projectId,
  features: {
    analytics: true,
    email: false,
    socials: [],
    allWallets: 'ONLY_MOBILE'
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20
  }
})

function App() {
  const setApiLoading = createUserStore(state => state.setApiLoading)
  const doLogin = createUserStore(state => state.login)
  const getActiveTask = createSocialTaskStore(state => state.getActiveTasks)
  const getRandomLesson = createQuizzStore(state => state.getRandomLesson)
  const getRandomLessonForCampaign = createQuizzStore(state => state.getRandomLessonForCampaign)
  const checkThisSeasonBadge = createSeasonBadgeStore(state => state.checkThisSeasonBadge)
  const currentSeasonBadge = createSeasonBadgeStore(state => state.currentSeasonBadge)
  const checkCheckInYesterday = createUserStore(state => state.checkCheckInYesterday)
  const checkCheckinDaily = createUserStore(state => state.checkCheckinDaily)
  const addRef = createUserStore(state => state.addRef)
  const getLeaderBoard = createUserStore(state => state.getLeaderBoard)
  const getVouchers = createVoucherStore(state => state.getVouchers)
  const getAvailableVouchers = createVoucherStore(state => state.getAvailableVouchers)

  const [active, setActive] = useState(0);
  const [isCampaign, setIsCampaign] = useState(false)
  const [userId, setUserId] = useState("")

  const handleClickActive = (index) => {
    setActive(index);
  };

  useEffect(() => {
    async function fetch() {
      await setApiLoading(true)
      console.log(WebApp.initDataUnsafe.user.id.toString());
      let token = await doLogin(
        WebApp.initDataUnsafe.user.id.toString(),
        WebApp.initDataUnsafe.user.username ?? WebApp.initDataUnsafe.user.first_name + " " + WebApp.initDataUnsafe.user.last_name
      )
      const userRefId = WebApp.initDataUnsafe?.start_param?.toString()
      setUserId(userRefId)
      if (userRefId) {
        await addRef(userRefId, token);
      }
      await getActiveTask(token)
      await getRandomLesson(token)
      await checkCheckinDaily()
      await checkCheckInYesterday()
      let gotIt = await checkThisSeasonBadge(token)
      if (gotIt.tokenId != null) {
        await getRandomLessonForCampaign(token)
      }
      await currentSeasonBadge()
      await getLeaderBoard()
      await getVouchers(token)
      await setApiLoading(false)
      await getAvailableVouchers()
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
                  setIsCampaign={setIsCampaign}
                  userId={userId}
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
                  handleClickActive={handleClickActive}
                />
              } />
              <Route path="/leaderboard" element={
                <Leaderboard
                  handleClickActive={handleClickActive}
                />
              } />
              <Route path="/shop" element={<Shop />} />
              <Route path="/drop-game" element={<DropGame />} />
              <Route path="/mean-matching-game" element={<MeanMatchingGame />}/>
            </Routes>
          </div>
          <div className="footer max-h-[10vh]">
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