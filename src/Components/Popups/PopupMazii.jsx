import React from 'react';
import Navigation from '../Navigation';

const PopupMazii = ({ handleClose }) => {
    const handleClick = () => {
        window.open("https://job.mazii.net/vi-VN", '_blank');
        setTimeout(() => {
            handleClose()
        }, 5000)
    }

    return (
        <div class="absolute fixed p-4 w-full max-h-full z-50 top-40">
            <div class="relative rounded-lg shadow bg-[#1E6252]">
                <div class="items-center justify-between p-4">
                    <p class="text-base leading-relaxed text-white">
                        Opps! You answer wrong too much! Visit Mazii to keep playing!
                    </p>
                    <p className='text-white'>Mazii Job - Top Japanese Job Search Platform</p>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                </div>
                <button
                    onClick={handleClick}
                    className="bottom-[3vh] my-10 rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-xl bg-[#FFD46B]">
                    <div className="py-[1vh]">
                        Go!
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PopupMazii;