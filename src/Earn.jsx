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

                <div className='flex'>
                    <div className="relative w-[160px] h-[110px] bg-[#0088cc] rounded-[20px] left-6 mr-[15px]">
                        <p className="text-left ml-[10px] mt-[10px] font-nunito-bold font-bold text-white text-xl tracking-[0] leading-[normal]">
                            Satori Drop
                        </p>

                        <div className="absolute bottom-[10px] right-[5px] w-[76px] h-[26px] bg-[#d9d9d9] rounded-[18px]">
                            <button
                                onClick={() => handleClick(1, "/game")}
                                className="text-black text-xl font-nunito-bold font-bold text-center">
                                Play
                            </button>
                        </div>
                    </div>

                    <div className="relative w-[160px] h-[110px] bg-[#0088cc] rounded-[20px] left-6">
                        <p className="text-left ml-[10px] mt-[10px] font-nunito-bold font-bold text-white text-xl tracking-[0] leading-[normal]">
                            Mean matching
                        </p>

                        <div className="absolute bottom-[10px] right-[5px] w-[76px] h-[26px] bg-[#d9d9d9] rounded-[18px]">
                            <button
                                onClick={() => handleClick(1, "/mean-matching-game")}
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