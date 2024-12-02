import React from 'react';
import Navigation from '../Navigation';

const Popup = ({ code, handleClose }) => {
    console.log(code);
    
    return (
        <div class="absolute fixed p-4 w-full max-h-full z-50 top-40">
            <div class="relative rounded-lg shadow bg-[#1E6252]">
                <div class="items-center justify-between p-4">
                    <h3 class="text-4xl text-[#FFD46B] font-semibold text-center">
                        Congratulations!
                    </h3>
                    <p class="text-base leading-relaxed text-white">
                        Copy your license key
                    </p>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                    <p class="text-base leading-relaxed text-white">
                        {code}
                    </p>
                </div>
                <button
                    onClick={handleClose}
                    className="bottom-[3vh] my-10 rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-xl bg-[#FFD46B]">
                    <div className="py-[1vh]">
                        Next
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Popup;