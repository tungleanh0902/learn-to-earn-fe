import React, { useState } from 'react';
import mazii from '../assets/mazii.png';
import { createUserStore } from "../api/user.api";
import { createVoucherStore } from "../api/voucher.api";
import BigNumber from "bignumber.js";
import {
    useTonConnectUI,
    useTonWallet
  } from "@tonconnect/ui-react";
import { createTransaction } from '../api/helper';

const Listing = () => {
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();

    const token = createUserStore(state => state.token)
    const userInfo = createUserStore(state => state.userInfo)
    const listing = createVoucherStore(state => state.listing)
    const getVouchers = createVoucherStore(state => state.getVouchers)
    const doGetListing = createVoucherStore(state => state.doGetListing)
    const doCancelListing = createVoucherStore(state => state.doCancelListing)
    const buyVoucher = createVoucherStore(state => state.buyVoucher)
    const [loading, setLoading] = useState(false);

    const handleBuyLicenseTon = async (price, ownerAddress, voucherId) => {
        console.log("handleBuyLicenseTon");
        try {
            if (userInfo.address == null) {
                throw addNotification({
                    message: 'Connect your wallet in Misson tab first',
                    theme: 'red',
                })
            }
            if (userInfo.address != wallet.account.address) {
                await tonConnectUI.disconnect()
                throw addNotification({
                    message: 'Wrong wallet',
                    theme: 'red',
                })
            }
            setLoading(true);
            let tx = createTransaction(ownerAddress, price, null)
            let result = await tonConnectUI.sendTransaction(tx);
            let data = await buyVoucher(
                {
                    boc: result?.boc,
                    voucherId: voucherId
                },
                token
            )
            await getVouchers(token)
            await doGetListing(token)
            addNotification({
                title: 'Success',
                message: "Buy license successfully",
                theme: 'darkblue',
            })
        } catch (e) {
            console.error(e);
            return setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const handleCancleListing = async (voucherId) => {
        try {
            await doCancelListing({
                voucherId
            }, token)
            addNotification({
                title: 'Success',
                message: "Cancel listing license successfully",
                theme: 'darkblue',
            })
        } catch (error) {
            console.error(e);
            return setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#1e1e1e] justify-center w-full h-full flex items-center">
            <div className="bg-[#1e1e1e] w-screen h-[90vh] relative overflow-x-hidden overflow-y-auto">
                <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                    <ul role="list" className="grid gap-x-8 gap-y-12 grid-cols-2">
                        {listing.map((item, index) => {
                            let number = BigNumber(item.price).dividedBy(10 ** 9)
                            return (
                                <li>
                                    <div key={index} className="items-center rounded-2xl bg-[#FFFFFF]">
                                        <img className='rounded-t-2xl' src={mazii} alt="" />
                                        <div>
                                            <h3 class="text-base/7 font-semibold tracking-tight text-gray-900">Mazii Dict License</h3>
                                            <div className=''>Activation period</div>
                                            <div className='mb-[10px]'>{item.activationPeriod ?? "1 year"}</div>
                                            <div className=''>Activation date</div>
                                            <div className='mb-[10px]'>{item?.activationDate?.substring(0, 10) ?? "2024-12-31"}</div>
                                        </div>
                                        <p>{number.toNumber()} TON</p>
                                        {
                                            item.owner._id == userInfo._id ?
                                            <button
                                                onClick={() => handleCancleListing(item._id)}
                                                className="my-1 rounded-[20px] w-[30vw] font-adlam-display text-xl bg-[#3367D5]">
                                                <div className="py-[1vh] text-white">
                                                    {loading ? "Loading..." : "Cancel"}
                                                </div>
                                            </button>
                                            :
                                            <button
                                                onClick={() => handleBuyLicenseTon(item.price, item.owner.address, item._id)}
                                                className="my-1 rounded-[20px] w-[30vw] font-adlam-display text-xl bg-[#3367D5]">
                                                <div className="py-[1vh] text-white">
                                                    {loading ? "Loading..." : "BUY NOW"}
                                                </div>
                                            </button>
                                        }
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Listing;
