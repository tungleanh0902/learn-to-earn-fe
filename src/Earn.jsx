import React, { useState } from 'react';
import WeeklyCampaign from './Components/WeeklyCampaign';
import Task from './Components/Task';
import { useNavigate } from 'react-router-dom';
import ton from './assets/ton.png';
import { createUserStore } from "./api/user.api";
import PopupTon from './Components/Popups/PopupTon';

const Earn = ({ active, handleClickActive, setIsCampaign }) => {
    const userInfo = createUserStore(state => state.userInfo)

    const navigate = useNavigate();

    const [isHidden, setIsHidden] = useState(true)

    const handleClose = () => {
        setIsHidden(true)
    }

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
                {
                    isHidden ?
                        <></>
                        :
                        <PopupTon
                            amount={userInfo?.bonusTon ?? 0}
                            handleClose={handleClose}
                        />
                }

                <div className="absolute text-right font-baloo font-bold text-black bg-white rounded-l-2xl rounded-r-xl text-left right-[10vw] top-[5vh]">
                    <button onClick={()=>setIsHidden(false)} className='flex'>
                        <img src={ton} alt="" className='w-[30px] rounded-full' />
                        <div className='pt-[5px] pl-[5px] pr-[10px] text-right font-medium'>{userInfo?.bonusTon ?? 0}</div>
                    </button>
                </div>

                <div className="relative">
                    <WeeklyCampaign handleClick={handleClick} />
                </div>

                <div className="relative pt-[2vh]"></div>

                <div className="pl-[5vw] pr-[5vw] overflow-x-auto flex space-x-4 flex-row">
                    <div className="relative h-[18vh] bg-[#0088cc] rounded-[20px] flex-1">
                        <p className="text-left pl-[10px] pt-[10px] font-nunito-bold font-bold text-white text-xl leading-[normal]">
                            Satori Drop
                        </p>

                        <div className="absolute bottom-[2vh] right-[1vw] w-[20vw] h-[4vh] bg-[#d9d9d9] rounded-[18px]">
                            <button
                                onClick={() => handleClick(1, "/drop-game")}
                                className="text-black text-xl font-nunito-bold font-bold text-center">
                                Play
                            </button>
                        </div>
                    </div>
                    <div className="relative h-[18vh] bg-[#0088cc] rounded-[20px] flex-1">
                        <p className="text-left pl-[10px] pt-[10px] font-nunito-bold font-bold text-white text-xl leading-[normal]">
                            Mean Matching
                        </p>

                        <div className="absolute bottom-[2vh] right-[1vw] w-[20vw] h-[4vh] bg-[#d9d9d9] rounded-[18px]">
                            <button
                                onClick={() => handleClick(1, "/mean-matching-game")}
                                className="text-black text-xl font-nunito-bold font-bold text-center">
                                Play
                            </button>
                        </div>
                    </div>
                    <div className="relative h-[18vh] bg-[#0088cc] rounded-[20px] flex-1">
                        <p className="text-left pl-[10px] pt-[10px] font-nunito-bold font-bold text-white text-xl leading-[normal]">
                            Word Filling
                        </p>

                        <div className="absolute bottom-[2vh] right-[1vw] w-[20vw] h-[4vh] bg-[#d9d9d9] rounded-[18px]">
                            <button
                                onClick={() => handleClick(1, "/word-filling-game")}
                                className="text-black text-xl font-nunito-bold font-bold text-center">
                                Play
                            </button>
                        </div>
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