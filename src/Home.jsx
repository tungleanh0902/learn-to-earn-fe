import React, { useState, useEffect } from 'react';
import './App.css'
import './index.css'
import darkAavatar from './assets/avatar-dark.svg';
import share from './assets/share-icon.png';
import ava from './assets/badge.jpg';
import checkbox from './assets/check-box.png';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk'
import { createUserStore } from "./api/user.api";
import { createSeasonBadgeStore } from "./api/seasonBadge.api";
import { isTMA } from '@telegram-apps/sdk';

const Home = ({ active, handleClickActive, setIsCampaign }) => {
    const navigate = useNavigate();

    const userInfo = createUserStore(state => state.userInfo)
    const checkedToday = createUserStore(state => state.checkedToday)
    const doCheckIn = createUserStore(state => state.checkIn)
    const isApiLoading = createUserStore(state => state.isApiLoading)
    const checkBoughtSeasonBadge = createSeasonBadgeStore(state => state.checkBoughtSeasonBadge)

    const [checkTma, setCheckTma] = useState(false);

    useEffect(() => {
        async function fetch() {
            let isTma = await isTMA()
            console.log(isTma);
            setCheckTma(isTma)
        }
        fetch()
    }, [])

    const handleClick = (index, path) => {
        if (isApiLoading == true) {
            return
        }
        handleClickActive(index)
        navigate(path);
        setIsCampaign(false)
    };

    const handleCopyLink = () => {
        const inviteLink = `${import.meta.env.VITE_INVITE_URL}?startapp=${WebApp.initDataUnsafe.user.id.toString()}`
        navigator.clipboard.writeText(inviteLink)
        alert('Invite link copied to clipboard!')
    }

    return (
        <div className="bg-[#1e1e1e] flex flex-row justify-center w-full h-full">
            <div className="bg-[#1e1e1e] overflow-y-scroll h-[78vh] w-screen h-screen relative">
                {/* <button 
                    className ="relative bg-white text-black"
                    // onClick={() => handleClick(1, "/game")}
                >Game</button> */}
                <button 
                    className ="relative bg-white text-black"
                    onClick={() => handleClick(1, "/sentence-game")}
                >Sentence Game</button>

                <div className="relative pt-[5vh] font-baloo text-2xl font-bold text-white">Streaks: {userInfo?.streak ?? 1}x</div>

                <button
                    className="fixed top-[3vh] right-[5vw]"
                    onClick={() => handleCopyLink()}>
                    <img
                        className=""
                        src={share}
                        alt="Share icon">
                    </img>
                    <div className="relative text-white font-adlam-display font-thin text-xs">Share</div>
                </button>

                <img
                    className="relative pt-[3vh] mx-auto justify-center img-badge"
                    alt="avatar"
                    src={darkAavatar}
                ></img>

                <div className="relative text-white font-baloo font-bold text-2xl">
                    <span>{WebApp.initDataUnsafe.user.username ?? WebApp.initDataUnsafe.user.first_name + " " + WebApp.initDataUnsafe.user.last_name}
                        {checkBoughtSeasonBadge ?
                            <img
                                className="inline-block ml-[10px]"
                                src={checkbox}
                                alt="check box"
                            ></img>
                            : null}
                    </span>
                </div>

                <div className="relative text-white font-baloo font-bold text-3xl">{userInfo?.points ?? 0} pts</div>

                <div className="relative text-white text-base font-nunito-bold font-bold pb-[3vh]">{userInfo?.refCount ?? 0} referral</div>

                {
                    checkTma ?
                        <></>
                        :
                        <>
                            <div class="relative bg-white w-[75vw] justify-center mx-auto rounded-[13px]">
                                <input id="npm-install" type="text" class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${import.meta.env.VITE_INVITE_URL}?startapp=${WebApp.initDataUnsafe.user.id.toString()}`} disabled readonly />
                            </div>
                            <div className="pt-[3vh]"></div>
                        </>
                }

                <button
                    className="relative bg-white w-[75vw] justify-center mx-auto rounded-[13px]"
                    onClick={() => handleClick(1, "/learn")}>
                    <div className="py-[1vh] font-adlam font-bold text-2xl">Learn to earn</div>
                </button>

                <div className="pt-[3vh]"></div>

                <button className="relative bg-white w-[75vw] justify-center mx-auto rounded-[13px]"
                    disabled={checkedToday}
                    onClick={doCheckIn}>
                    <div className="py-[1vh] font-adlam text-2xl font-bold">{isApiLoading ? "Loading..." : checkedToday ? "Checked in" : "Check in"}</div>
                </button>
            </div>
        </div>
    );
};

export default Home;