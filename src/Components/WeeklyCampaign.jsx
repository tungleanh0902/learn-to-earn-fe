import React from 'react';
import { createSeasonBadgeStore } from "../api/seasonBadge.api";
import addNotification from 'react-push-notification';

const WeeklyCampaign = ({ handleClick }) => {
    const checkBoughtSeasonBadge = createSeasonBadgeStore(state => state.checkBoughtSeasonBadge)

    const handleJoinCampaign = async () => {
        if (checkBoughtSeasonBadge == false) {
            addNotification({
                message: 'You are not having badge season!',
                theme: 'darkblue',
            })
        } else {
            await handleClick(3, "/learn")
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
        </div>
    );
};

export default WeeklyCampaign;