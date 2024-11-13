import React, {useEffect} from 'react';
import shoppingCart from './assets/shopping-cart.svg';
import QuestionSection from './Components/QuestionSection';

const Learn = ({isCampaign}) => {
    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-screen relative">
                <div className="absolute left-[5%] text-[40px] font-baloo font-bold text-white top-[2%]">
                    Learn
                </div>

                <div className="relative top-[15%]">
                    <QuestionSection isCampaign={isCampaign} />
                </div>

            </div>
        </div>
    );
};

export default Learn;