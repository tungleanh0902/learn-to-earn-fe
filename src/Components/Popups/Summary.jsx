import React from 'react';
import Navigation from '../Navigation';

const Summary = ({ handleClose, summary }) => {
    const handleClick = () => {
        window.open("https://job.mazii.net/vi-VN", '_blank');
        handleClose()
    }

    console.log(summary);

    return (
        <div class="absolute fixed p-4 w-full max-h-full z-50 top-40">
            <div class="relative rounded-lg shadow bg-black">
                <div class="items-center justify-between p-4">
                    <h3 class="text-base leading-relaxed text-white">
                        Congratulations!!!
                    </h3>
                    <p className='text-white'>Mazii Job - Top Japanese Job Search Platform</p>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                </div>
                <button
                    onClick={handleClick}
                    className="bottom-[3vh] my-10 rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-xl bg-[#FFD46B]">
                    <div className="py-[1vh]">
                        Go back home
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Summary;