import React, { useState } from 'react';
import mazii from '../assets/mazii.png';
import { createVoucherStore } from "../api/voucher.api";
import PopupVoucher from './PopupVoucher';

const Orders = () => {
    const vouchers = createVoucherStore(state => state.vouchers)

    const [isHidden, setIsHidden] = useState(true)
    const [currentItem, setCurrentItem] = useState()

    const handleClose = () => {
        setIsHidden(true)
    }

    return (
        <div className="bg-[#1e1e1e] justify-center w-full h-full flex items-center">
            <div className="bg-[#1e1e1e] w-screen h-[90vh] relative overflow-x-hidden overflow-y-auto">
                {
                    isHidden ?
                        <></>
                        :
                        <PopupVoucher
                            item={currentItem}
                            handleClose={handleClose}
                        />
                }
                <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                    <ul role="list" className="grid gap-x-8 gap-y-12 grid-cols-2">
                        {vouchers.map((item, index) => {
                            return (
                                <li>
                                    <button onClick={() => {
                                        setCurrentItem(item)
                                        setIsHidden(false)
                                    }} key={index} className="items-center rounded-2xl bg-[#FFFFFF]">
                                        <img className='rounded-t-2xl' src={mazii} alt="" />
                                        <div>
                                            <h3 class="text-base/7 font-semibold tracking-tight text-gray-900">Mazii Dict</h3>
                                            <p class="text-sm/6">{item.createdAt.substring(0, 10)}</p>
                                        </div>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Orders;
