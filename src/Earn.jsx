import React, { useEffect } from 'react';
import WeeklyCampaign from './Components/WeeklyCampaign';
import Task from './Components/Task';
import { useNavigate } from 'react-router-dom';
import Game from './Game';

const Earn = ({ active, handleClickActive, setIsCampaign }) => {
    const navigate = useNavigate();

    const handleClick = (index, path) => {
        handleClickActive(index);
        navigate(path);
        setIsCampaign(true);
    };

    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen h-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-[90vh] relative">
                <div className="relative text-[40px] font-baloo font-bold text-white text-left left-[5vw] pt-[3vh]">
                    Earn
                </div>

                <div className="relative">
                    <WeeklyCampaign handleClick={handleClick} />
                </div>

                <div className="relative pt-[2vh]"></div>

                <div className="relative w-[337px] h-[110px] bg-[#0088cc] rounded-[20px] left-6">
                    <p className="absolute text-left w-[304px] top-[7px] left-[20px] font-nunito-bold font-bold text-white text-xl tracking-[0] leading-[normal]">
                        Satori Drop
                    </p>

                    <div className="relative w-[76px] h-[26px] top-[70px] left-[240px] bg-[#d9d9d9] rounded-[18px]">
                        <button
                            onClick={() => handleClick(0, "/game")}
                            className="text-black text-xl font-nunito-bold font-bold text-center">
                            Play
                        </button>
                    </div>
                </div>

                

                <div className="relative max-h-[30vh]">
                    <Task handleClickActive={handleClickActive} />
                </div>
            </div>
        </div>
    );
};

export default Earn;