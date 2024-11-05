import React from 'react';
import task from './assets/task.png';
import shoppingCart from './assets/shopping-cart.svg';
import WeeklyCampaign from './Components/WeeklyCampaign';
import Task from './Components/Task';

const Earn = () => {
    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-screen relative">
                <div className="absolute left-[14px] text-[40px] font-baloo font-bold text-white top-[10px]">
                    Task
                </div>

                <div className="absolute right-[20px] top-[20px]">
                    <img
                        src={shoppingCart}
                        alt="Shopping cart"
                        className="w-6 h-6"
                    ></img>
                    <div className="relative font-bold top-[2px] font-lato-regular text-white text-[14px] right-[2px]">
                        Shop
                    </div>
                </div>
                
                <div className="absolute left-[30px] top-[80px] font-adlam-display text-white text-[20px]" >
                    Weekly
                </div>

                <div className="relative top-[120px]">
                    <WeeklyCampaign />
                </div>

                <div className="relative top-[130px] left-[25px]">
                    <Task />
                </div>

            </div>
        </div>
    );
};

export default Earn;