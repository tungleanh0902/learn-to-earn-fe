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
import { createSocialTaskStore } from "./api/socialTask.api";
import { createQuizzStore } from "./api/quizz.api";
import { createSeasonBadgeStore } from "./api/seasonBadge.api";
import { createVoucherStore } from "./api/voucher.api";
import { isTMA } from '@telegram-apps/sdk';
import CVForm from './Components/CVForm';
import { useMetaMask } from './hooks/useMetamask'

const Home = ({ active, handleClickActive, setIsCampaign }) => {
    const navigate = useNavigate();

    const userInfo = createUserStore(state => state.userInfo)
    const checkedToday = createUserStore(state => state.checkedToday)
    const doCheckIn = createUserStore(state => state.checkIn)
    const isApiLoading = createUserStore(state => state.isApiLoading)
    const checkBoughtSeasonBadge = createSeasonBadgeStore(state => state.checkBoughtSeasonBadge)
    const [isHidden, setIsHidden] = useState(false)
    const setApiLoading = createUserStore(state => state.setApiLoading)
    const checkThisSeasonBadge = createSeasonBadgeStore(state => state.checkThisSeasonBadge)
    const loginEvm = createUserStore(state => state.loginEvm)
    const getActiveTask = createSocialTaskStore(state => state.getActiveTasks)
    const getRandomLesson = createQuizzStore(state => state.getRandomLesson)
    const checkCheckinDaily = createUserStore(state => state.checkCheckinDaily)
    const checkCheckInYesterday = createUserStore(state => state.checkCheckInYesterday)
    const currentSeasonBadge = createSeasonBadgeStore(state => state.currentSeasonBadge)
    const getLeaderBoard = createUserStore(state => state.getLeaderBoard)
    const getVouchers = createVoucherStore(state => state.getVouchers)
    const getAvailableVouchers = createVoucherStore(state => state.getAvailableVouchers)
    const getRandomLessonForCampaign = createQuizzStore(state => state.getRandomLessonForCampaign)
    const { wallet: evmWallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()

    const [checkTma, setCheckTma] = useState(false);

    const handleClose = () => {
        setIsHidden(true)
    }

    useEffect(() => {
        async function fetch() {
            let isTma = await isTMA()
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
        const inviteLink = `${import.meta.env.VITE_INVITE_URL}?startapp=${WebApp.initDataUnsafe?.user?.id.toString()}`
        navigator.clipboard.writeText(inviteLink)
        alert('Invite link copied to clipboard!')
    }

    useEffect(() => {
        // only for evm
        async function fetch() {
            try {
                await setApiLoading(true)
                let evmAddress = evmWallet?.accounts[0]
                let token = await loginEvm(evmAddress.toLocaleLowerCase())
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
                await getAvailableVouchers()
                await setApiLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        if (evmWallet?.accounts[0] && evmWallet.accounts[0].length > 0) {
            console.log("connected");
            fetch()
        }
    }, [evmWallet])

    return (
        <div className="bg-[#1e1e1e] flex flex-row justify-center w-full h-full">
            <div className="bg-[#1e1e1e] overflow-y-scroll h-[78vh] w-screen h-screen relative">
                <div className="relative pt-[5vh] font-baloo text-2xl font-bold text-white">Streaks: {userInfo?.streak ?? 1}x</div>

                {
                    isHidden ?
                        <></>
                        :
                        <CVForm
                            currentItem={"674937a6c5eb84ff509f5c14"}
                            handleClose={handleClose}
                        />
                }

                {
                    checkTma ?
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
                        :
                        <button
                            className="fixed top-[3vh] right-[5vw]"
                            onClick={() => {
                                // modal.open()
                                connectMetaMask()
                            }}>
                            <div className="relative text-white font-adlam-display font-thin text-xs">{evmWallet.accounts[0] ? evmWallet.accounts[0] : "Connect Kaia" }</div>
                        </button>
                }

                <img
                    className="relative pt-[3vh] mx-auto justify-center img-badge"
                    alt="avatar"
                    src={darkAavatar}
                ></img>

                <div className="relative text-white font-baloo font-bold text-2xl">
                    <span>{userInfo?.username ?? "Hello"}
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