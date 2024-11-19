import React from 'react';

const PointsPopUp = ({ points, isActive }) => {
    return (
        <div id='ModelContainer' className={`${isActive ? "animate-jump-in" : ""} fixed inset-0`}>
            <div 
                className='bg-[#ffcc00] backdrop-blur-lg shadow-inner rounded-[25px] py-[0.5vh] justify-center mx-auto fixed -translate-x-1/2 transform -translate-y-1/2 top-[8vh] left-1/2'>
                <div
                    className=''>
                    <h2
                        className='font-semibold py-[1vh] text-center text-xl text-black px-[7vw]'>
                        +{points}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default PointsPopUp;
