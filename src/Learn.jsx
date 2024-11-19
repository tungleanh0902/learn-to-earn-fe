import React, { useEffect } from 'react';
import QuestionSection from './Components/QuestionSection';

const Learn = ({ isCampaign, handleClickActive }) => {
    return (
        <div className="bg-black flex flex-row w-screen">
            <div className="bg-black overflow-hidden w-screen h-[90vh] relative">
                <div className="relative text-left pt-[5vh] pl-[5vw] text-4xl font-baloo font-bold text-white">
                    Learn
                </div>

                <div className="relative pt-[3vh] overflow-y-auto h-[78vh]">
                    <QuestionSection
                        isCampaign={isCampaign}
                        handleClickActive={handleClickActive}
                    />
                </div>

            </div>
        </div>
    );
};

export default Learn;