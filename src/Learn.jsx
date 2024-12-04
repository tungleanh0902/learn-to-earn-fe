import React, { useEffect } from 'react';
import QuestionSection from './Components/QuestionSection';
import { createQuizzStore } from "./api/quizz.api";

const Learn = ({ isCampaign, handleClickActive }) => {
    const answers = createQuizzStore(state => state.answers)
    
    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen h-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-[90vh] relative">
                <div className='flex'>
                    <div className="relative text-left pt-[5vh] pl-[5vw] text-4xl font-baloo font-bold text-white">
                        Learn
                    </div>

                    <div className="w-[230px] mt-[40px] ml-[20px] h-6 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div className="h-6 bg-gradient-to-r from-white bg-[#2990FF] rounded-full text-left pl-[10px] pb-[5px] font-bold" style={{width: `${Math.round((answers/25)*100)}%`}}>{Math.round((answers/25)*100)}%</div>
                    </div>
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