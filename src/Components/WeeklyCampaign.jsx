import React, { useState } from 'react';
import { createSeasonBadgeStore } from "../api/seasonBadge.api";
import { createUserStore } from "../api/user.api";
import addNotification from 'react-push-notification';
import {
    useTonConnectUI,
    useTonWallet
} from "@tonconnect/ui-react";
import { createTransaction } from '../api/helper';

const WeeklyCampaign = ({ handleClick }) => {
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const checkBoughtSeasonBadge = createSeasonBadgeStore(state => state.checkBoughtSeasonBadge)
    const buyNft = createSeasonBadgeStore(state => state.buyNft)
    const seasonBadge = createSeasonBadgeStore(state => state.seasonBadge)
    const [loading, setLoading] = useState(false);
    const token = createUserStore(state => state.token)
    const buyMoreQuizz = createUserStore(state => state.buyMoreQuizz)
    const userInfo = createUserStore(state => state.userInfo)
    const connectWallet = createUserStore(state => state.connectWallet)
    const getMintBodyData = createUserStore(state => state.getMintBodyData)

    const handleJoinCampaign = async () => {
        if (checkBoughtSeasonBadge == false) {
            addNotification({
                message: 'You are not having badge season!',
                theme: 'darkblue',
            })
        } else {
            await handleClick(1, "/learn")
        }
    }

    const handleBuyMoreQuizz = async () => {
        console.log("handleBuyMoreQuizz");
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
            let tx = createTransaction(import.meta.env.VITE_ADMIN_WALLET.toString(), import.meta.env.VITE_MORE_QUIZZ_FEE.toString(), null)
            const result = await tonConnectUI.sendTransaction(tx);
            await buyMoreQuizz(
                {
                    boc: result.boc,
                    network: wallet.account.chain == "-3" ? "testnet" : "mainnet",
                    sender: wallet.account.address
                }
            )
        } catch (e) {
            console.log(e);
        } finally {
            addNotification({
                message: 'Buy nft success!',
                theme: 'light',
            })
            setLoading(false);
        }
    }

    const handleBuyNft = async () => {
        console.log("handleBuyNft");
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

            let bodyData = await getMintBodyData({
                refUserId: userInfo?.refUser
            }, token)
            
            console.log(wallet);
            let tx = createTransaction(seasonBadge.address, import.meta.env.VITE_MINT_FEE.toString(), bodyData)
            const result = await tonConnectUI.sendTransaction(tx);
            await buyNft(
                {
                    badgeId: seasonBadge._id,
                    tokenId: seasonBadge.nextItemIndex,
                    boc: result.boc,
                    network: wallet.account.chain == "-3" ? "testnet" : "mainnet",
                    sender: wallet.account.address
                },
                token
            )
        } catch (e) {
            console.error(e);
        } finally {
            addNotification({
                message: 'Buy nft success!',
                theme: 'light',
            })
            setLoading(false);
        }
    }

    return (
        <div className="relative w-[337px] h-[110px] bg-[#262829] rounded-[20px] left-6">
            <p className="absolute text-left w-[304px] top-[7px] left-[20px] font-nunito-bold font-bold text-white text-xl tracking-[0] leading-[normal]">
                Join this week exclusive Campaign
            </p>

            <div className="relative w-[76px] h-[26px] top-[70px] left-[240px] bg-[#d9d9d9] rounded-[18px]">
                <button
                    onClick={handleJoinCampaign}
                    className="text-black text-xl font-nunito-bold font-bold text-center">
                    Join
                </button>
            </div>
            {/* <div className="relative w-[76px] h-[26px] top-[70px] left-[240px] bg-[#d9d9d9] rounded-[18px]">
                {wallet ? (
                    <button
                        disabled={loading}
                        onClick={handleBuyMoreQuizz}
                        className="text-black text-xl font-nunito-bold font-bold text-center">
                        {loading ? "Loading..." : "MQuizz"}
                    </button>
                ) : (
                    <button onClick={() => tonConnectUI.openModal()}>
                        Connect wallet to send the transaction
                    </button>
                )}
            </div> */}
            <div className="relative w-[76px] h-[26px] top-[70px] left-[240px] bg-[#d9d9d9] rounded-[18px]">
                {wallet ? (
                    <button
                        disabled={loading}
                        onClick={handleBuyNft}
                        className="text-black text-xl font-nunito-bold font-bold text-center">
                        {loading ? "Loading..." : "Badge"}
                    </button>
                ) : (
                    <button onClick={() => tonConnectUI.openModal()}>
                        Connect wallet to send the transaction
                    </button>
                )}
            </div>
        </div>
    );
};

export default WeeklyCampaign;