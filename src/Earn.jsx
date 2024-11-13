import React, {useEffect} from 'react';
import WeeklyCampaign from './Components/WeeklyCampaign';
import Task from './Components/Task';
import { useNavigate } from 'react-router-dom';

const Earn = ({active, handleClickActive, setIsCampaign}) => {
    const navigate = useNavigate();

    const handleClick = (index, path) => {
        handleClickActive(index)
        navigate(path);
        setIsCampaign(true)
    };
    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-screen relative">
                <div className="absolute left-[14px] text-[40px] font-baloo font-bold text-white top-[10px]">
                    Task
                </div>

                <div className="absolute left-[30px] top-[80px] font-adlam-display text-white text-[20px]" >
                    Weekly
                </div>

                <div className="relative top-[120px]">
                    <WeeklyCampaign handleClick={handleClick} />
                </div>

                <div className="relative top-[130px] left-[25px]">
                    <Task />
                </div>
            </div>
        </div>
    );
};

export default Earn;