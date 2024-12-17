import React, {useState} from 'react';
import Navigation from '../Navigation';
import { shortName } from '../../api/helper';
import { createUserStore } from "../../api/user.api";
import { createVoucherStore } from "../../api/voucher.api";
import addNotification from 'react-push-notification';

const PopupVoucher = ({ item, handleClose }) => {
    const doListLicense = createVoucherStore(state => state.doListLicense)
    const token = createUserStore(state => state.token)
    const userInfo = createUserStore(state => state.userInfo)

    const [price, setPrice] = useState()
    
    const handleListForSale = async () => {
        try {
            if (userInfo.address == null) {
                throw addNotification({
                    message: 'Connect your wallet in Misson tab first',
                    theme: 'red',
                })
            }
            let tonAmount = price * 10**9
            await doListLicense({
                voucherId: item.voucher._id,
                price: tonAmount.toString()
            }, token)
            addNotification({
                title: 'Success',
                message: "List license successfully",
                theme: 'darkblue',
            })
        } catch (error) {
            addNotification({
                title: 'Error',
                message: Error,
                theme: 'red',
            })
        }
    }

    return (
        <div class="absolute fixed p-4 w-full max-h-full z-50 top-30">
            <div class="relative rounded-lg shadow bg-white">
                <div class="items-center justify-between p-4">
                    <h3 class="text-4xl text-[#3367D5] font-semibold text-center">
                        Mazii Dict
                    </h3>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                    <div className="grid grid-cols-4 gap-4 my-[10px]">
                        <div className='ml-[30px] w-[130px] text-left'>Purchase date</div>
                        <div className='ml-[120px] w-[120px] text-left'>{item.createdAt.substring(0, 10)}</div>
                    </div>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                    <div className="grid grid-cols-4 gap-4 my-[10px]">
                        <div className='ml-[30px] w-[130px] text-left'>Activation period</div>
                        <div className='ml-[120px] w-[120px] text-left'>{item.activationPeriod ?? "1 year"}</div>
                    </div>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                    <div className="grid grid-cols-4 gap-4 my-[10px]">
                        <div className='ml-[30px] w-[130px] text-left'>Activation date</div>
                        <div className='ml-[120px] w-[120px] text-left'>{item?.activationDate?.substring(0, 10) ?? "2024-12-31"}</div>
                    </div>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                    <div className="grid grid-cols-4 gap-4 my-[10px]">
                        <div className='ml-[30px] w-[130px] text-left'>Tx</div>
                        <div className='ml-[120px] w-[120px] text-left'>{shortName(item.tx)}</div>
                    </div>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                    <div className="grid grid-cols-4 gap-4 my-[10px]">
                        <div className='ml-[30px] w-[130px] text-left'>License Key</div>
                        <div className='ml-[120px] w-[120px] text-left'>{item.voucher.code}</div>
                    </div>
                    <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
                </div>
                <div class="m-auto w-[60vw] rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input value={price} onChange={(e) => setPrice(e.target.value)}  type="number" placeholder='Price' class="min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"/>
                </div>
                <button
                    onClick={handleListForSale}
                    className="my-1 rounded-[20px] w-[60vw] font-adlam-display text-xl bg-[#3367D5]">
                    <div className="py-[1vh] text-white">
                        List for sale
                    </div>
                </button>
                <button
                    onClick={handleClose}
                    className="my-5 rounded-[20px] w-[60vw] font-adlam-display text-xl bg-[#3367D5]">
                    <div className="py-[1vh] text-white">
                        Close
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PopupVoucher;