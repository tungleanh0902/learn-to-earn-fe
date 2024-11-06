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
import Layout from "./Components/Layout";
import { useState } from 'react';
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
  );
}

export default App;