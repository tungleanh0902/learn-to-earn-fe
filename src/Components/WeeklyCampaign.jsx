import React from 'react';

const WeeklyCampaign = () => {
    return (
        <div className="relative w-[337px] h-[110px] bg-[#262829] rounded-[20px] left-6">
            <p className="absolute text-left w-[304px] top-[7px] left-[20px] font-nunito-bold font-bold text-white text-xl tracking-[0] leading-[normal]">
                Join this week exclusive Campaign
            </p>

            <div className="relative w-[76px] h-[26px] top-[70px] left-[240px] bg-[#d9d9d9] rounded-[18px]">
                <div className="text-black text-xl font-nunito-bold font-bold text-center">
                    Join
                </div>
            </div>
        </div>
    );
};

export default WeeklyCampaign;