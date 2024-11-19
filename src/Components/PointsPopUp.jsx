import React from 'react';

const PointsPopUp = ({ openPopUp, closePopUp }) => {
    const handleClosePopUp = (e) => {
        if (e.target.id === "ModelContainer") {
            closePopUp();
        }
    };

    if (openPopUp !== true) {
        return null;
    }

    return (
        <div
            id='ModelContainer'
            onClick={handleClosePopUp}
            className='fixed inset-0'>
            <div 
                className='bg-[#ffcc00] backdrop-blur-lg shadow-inner rounded-[25px] py-[0.5vh] justify-center mx-auto fixed -translate-x-1/2 transform -translate-y-1/2 top-[8vh] left-1/2'>
                <div
                    className=''>
                    <h2
                        className='font-semibold py-[1vh] text-center text-xl text-black px-[7vw] '>
                        +100
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default PointsPopUp;
