import React from 'react';
import { createSeasonBadgeStore } from "../api/seasonBadge.api";
import addNotification from 'react-push-notification';
import {
	useTonConnectUI,
} from "@tonconnect/ui-react";
// import {
// 	Cell,
// 	loadMessage,
// } from "@ton/core";

const WeeklyCampaign = ({handleClick}) => {
    const [tonConnectUi] = useTonConnectUI();
    const checkBoughtSeasonBadge = createSeasonBadgeStore(state => state.checkBoughtSeasonBadge)

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

    // const sendTon = async () => {
	// 	try {
	// 		const result = await tonConnectUi.sendTransaction(tx);
	// 		setLoading(true);
	// 		const hash = Cell.fromBase64(result.boc)
	// 			.hash()
	// 			.toString("base64");

	// 		const message = loadMessage(
	// 			Cell.fromBase64(result.boc).asSlice()
	// 		);
	// 		console.log("Message:", message.body.hash().toString("hex"));

	// 		if (client) {
	// 			const txFinalized = await waitForTransaction(
	// 				{
	// 					address: tonConnectUi.account?.address ?? "",
	// 					hash: hash,
	// 				},
	// 				client
	// 			);
	// 			console.log("txFinalized: ", txFinalized);
	// 		}
	// 	} catch (e) {
	// 		console.error(e);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

    const handleBuy = async () => {

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
                <button 
                    onClick={handleJoinCampaign}
                    className="text-black text-xl font-nunito-bold font-bold text-center">
                    Buy
                </button>
            </div>
        </div>
    );
};

export default WeeklyCampaign;