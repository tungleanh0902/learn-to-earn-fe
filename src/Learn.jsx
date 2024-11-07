import React from 'react';
import shoppingCart from './assets/shopping-cart.svg';
import QuestionSection from './Components/QuestionSection';

const Learn = () => {
    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-screen relative">
                <div className="absolute left-[5%] text-[40px] font-baloo font-bold text-white top-[2%]">
                    Learn
                </div>

                <div className="absolute right-[4%] top-[4%]">
                    <img
                        src={shoppingCart}
                        alt="Shopping cart"
                        className="w-6 h-6"
                    ></img>
                    <div className="relative font-bold top-[2px] font-lato-regular text-white text-[14px] right-[2px]">
                        Shop
                    </div>
                </div>

                <div className="relative top-[15%]">
                    <QuestionSection />
                </div>

            </div>
        </div>
    );
};

export default Learn;