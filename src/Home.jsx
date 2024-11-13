import React, { useState } from 'react';
import './App.css'
import './index.css'
import ava from './assets/avatar.svg';
import checkIcon from './assets/check-icon.svg';
import shoppingCart from './assets/shopping-cart.svg';
import rectangle1071 from './assets/rectangle-1071.png';
import Navigation from './Components/Navigation';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk'
import { createUserStore } from "./api/user.api";
import { createTransaction } from './api/helper';
import {
    useTonConnectUI,
    useTonWallet
} from "@tonconnect/ui-react";
import addNotification from 'react-push-notification';

const user = {
    name: 'top1server',
    avatar: ava,
    balance: 666,
    friendsCount: 23432,
    checkin: true,
};

const Home = ({ active, handleClickActive, setIsCampaign }) => {
    const userInfo = createUserStore(state => state.userInfo)
    const checkedToday = createUserStore(state => state.checkedToday)
    const doLogin = createUserStore(state => state.checkIn)
    const checkedYesterday = createUserStore(state => state.checkedYesterday)
    const saveStreak = createUserStore(state => state.saveStreak)
    const isApiLoading = createUserStore(state => state.isApiLoading)
    const connectWallet = createUserStore(state => state.connectWallet)

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    console.log("checkedYesterday", userInfo);
    
    const handleClick = (index, path) => {
        if (isApiLoading == true) {
            return
        }
        handleClickActive(index)
        navigate(path);
        setIsCampaign(false)
    };

    const handleSaveStreak = async () => {
        console.log("handleSaveStreak");
        try {
            if (userInfo.address != wallet.account.address) {
                tonConnectUI.openModal()
                tonConnectUI.onStatusChange(async w => {
                    if (w.account?.address) {
                        await connectWallet({
                            address: w.account.address
                        }, token)
                    }
                })
            }
            setLoading(true);
            console.log(wallet);
            let tx = createTransaction(import.meta.env.VITE_ADMIN_WALLET.toString(), import.meta.env.VITE_STREAK_FEE.toString(), null)
            const result = await tonConnectUI.sendTransaction(tx);
            await saveStreak(
                {
                    boc: result.boc,
                    network: wallet.account.chain == "-3" ? "testnet" : "mainnet",
                    sender: wallet.account.address
                }
            )
        } catch (e) {
            console.error(e);
            setLoading(false);
        } finally {
            addNotification({
                message: 'Buy streak success!',
                theme: 'light',
            })
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#1e1e1e] flex flex-row justify-center w-full h-full">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-screen relative">
                <div className="absolute w-[160px] h-14 top-[72%] left-[8%] bg-white rounded-[20px] overflow-hidden">
                    {wallet ? (
                        <button
                            disabled={checkedYesterday || userInfo?.hasStreakSaver ? true : loading ? true : false}
                            onClick={handleSaveStreak}
                            className="absolute w-[251px] top-[7px] left-[-44px] font-adlam font-normal text-black text-[26px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                            {isApiLoading ? "Loading..." : checkedYesterday || userInfo?.hasStreakSaver == true ? "On streak" : loading ? "Loading..." : "Buy streak"}
                        </button>
                    ) : (
                        <button onClick={() => tonConnectUI.openModal()}>
                            Connect wallet to send the transaction
                        </button>
                    )}
                </div>

                <div className="absolute w-[160px] h-14 top-[72%] left-[50%] bg-white rounded-[20px] overflow-hidden">
                    <button
                        disabled={checkedToday}
                        onClick={doLogin}
                        className="absolute w-[251px] top-[7px] left-[-44px] font-adlam font-normal text-black text-[26px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        {isApiLoading ? "Loading..." : checkedToday ? "Checked in" : "Check in"}
                    </button>
                </div>

                <div className="absolute w-[329px] h-14 top-[60%] left-[8%] bg-white rounded-[20px] overflow-hidden">
                    <button
                        onClick={() => handleClick(1, "/learn")}
                        className="absolute w-[251px] top-[7px] left-[39px] font-adlam-display folt-normal text-black text-[32px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        Daily quizz
                    </button>
                </div>

                <div className="absolute w-[206px] h-[261px] top-[124px] left-[115px]">
                    <div className="absolute w-[165px] h-[181px] -top-2 left-[26px]">
                        <div className="absolute w-[156px] h-[181px] top-0 left-0">
                            <img
                                className="absolute scale-[100%] left-[-15%] top-[-20%]"
                                alt="Avatar"
                                src={user.avatar}
                            />

                            <div className="absolute w-[140px] h-7 top-[60%] left-[-14%] font-baloo font-bold text-white text-2xl text-center tracking-[0] leading-[normal]">
                                {WebApp.initDataUnsafe.user.username ?? WebApp.initDataUnsafe.user.first_name + WebApp.initDataUnsafe.user.last_name}
                            </div>
                        </div>

                        <div className="absolute w-[17px] h-[17px] top-[65%] left-[72%] bg-[url(/check-box.svg)] bg-[100%_100%]">
                            <div className="w-[11px] h-[13px]">
                                <div className="relative w-[17px] h-[17px] bg-white rounded-[8.5px]">
                                    <div className="absolute w-[13px] h-[13px] top-0.5 left-0.5 bg-[#4ecc5e] rounded-[6.5px]" />

                                    <img
                                        className="absolute w-[13px] h-[13px] top-0.5 left-0.5"
                                        alt="Check icon"
                                        src={checkIcon}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute w-[200px] h-9 top-[50%] left-[-12%] font-baloo font-bold text-white text-5xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        {userInfo.points ?? 0} points
                    </div>

                    <div className="absolute w-[180px] top-[75%] left-[-6%] font-nunito-bold font-bold text-white text-base text-center tracking-[0] leading-[normal]">
                        {userInfo.refCount ?? 0} referral
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;