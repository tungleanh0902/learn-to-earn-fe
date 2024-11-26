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
        <div className="bg-[#1e1e1e] flex flex-row w-screen h-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-[90vh] relative">
                <div className="relative text-[40px] font-baloo font-bold text-white text-left left-[5vw] pt-[3vh]">
                    Task
                </div>

                <div className="relative font-adlam-display text-white text-[20px] text-left left-[8vw]">
                    Weekly
                </div>

                <div className="relative">
                    <WeeklyCampaign handleClick={handleClick} />
                </div>

                <div className="relative overflow-y-auto max-h-[65vh]">
                    <Task handleClickActive={handleClickActive} />
                </div>
            </div>
        </div>
    );
};

export default Earn;