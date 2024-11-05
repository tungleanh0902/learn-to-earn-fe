import React from 'react';
import task from './assets/task.png';
import shoppingCart from './assets/shopping-cart.svg';
import WeeklyCampaign from './Components/WeeklyCampaign';

const Earn = () => {
    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-screen relative">
                <div className="absolute left-[10px] text-[50px] font-baloo font-bold text-white top-[10px]">
                    Task
                </div>

                <div className="absolute right-[20px] top-[20px]">
                    <img
                        src={shoppingCart}
                        alt="Shopping cart"
                        className="w-8 h-8"
                    ></img>
                    <div className="relative top-[2px] font-lato-regular text-white">
                        Shop
                    </div>
                </div>
                
                <div className="absolute left-[30px] top-[80px] font-adlam-display text-white text-[30px]" >
                    Weekly
                </div>

                <WeeklyCampaign />
            </div>
        </div>
    );
};

export default Earn;