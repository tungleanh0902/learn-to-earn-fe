import React from 'react';
import Navigation from '../Navigation';
import { shortName } from '../../api/helper';

const PopupVoucher = ({ item, handleClose }) => {
    return (
        <div class="absolute fixed p-4 w-full max-h-full z-50 top-30">
            <div class="relative rounded-lg shadow bg-white">
                <div class="items-center justify-between p-4">
                    <h3 class="text-4xl text-[#3367D5] font-semibold text-center">
                        Mazii Dict
                    </h3>
                    <div className="grid grid-cols-4 gap-4 my-[10px]">
                        <div className='ml-[30px] w-[120px] text-left'>Duration</div>
                        <div className='ml-[120px] w-[120px] text-left'>Lifetime</div>
                    </div>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                    <div className="grid grid-cols-4 gap-4 my-[10px]">
                        <div className='ml-[30px] w-[120px] text-left'>Purchase date</div>
                        <div className='ml-[120px] w-[120px] text-left'>{item.createdAt.substring(0, 10)}</div>
                    </div>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                    <div className="grid grid-cols-4 gap-4 my-[10px]">
                        <div className='ml-[30px] w-[120px] text-left'>Tx</div>
                        <div className='ml-[120px] w-[120px] text-left'>{shortName(item.tx)}</div>
                    </div>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                    <div className="grid grid-cols-4 gap-4 my-[10px]">
                        <div className='ml-[30px] w-[120px] text-left'>License Key</div>
                        <div className='ml-[120px] w-[120px] text-left'>{item.voucher.code}</div>
                    </div>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                </div>
                <button
                    onClick={handleClose}
                    className="bottom-[3vh] my-5 rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-xl bg-[#3367D5]">
                    <div className="py-[1vh] text-white">
                        Next
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PopupVoucher;