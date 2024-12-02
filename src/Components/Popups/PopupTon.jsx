import React, { useState } from 'react';
import { createUserStore } from "../../api/user.api";
import close from '../../assets/close.png'
import addNotification from 'react-push-notification';

const PopupTon = ({ amount, handleClose }) => {
    const withdrawTon = createUserStore(state => state.withdrawTon)

    const [tonAmount, setTonAmount] = useState("0")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (amount < 0.1) {
                throw addNotification({
                    title: 'Error',
                    message: "Accumulate above 0.1 TON to withdraw",
                    theme: 'red',
                })
            }            
            if (amount < Number(tonAmount)) {
                throw addNotification({
                    title: 'Error',
                    message: "Exceed your balance",
                    theme: 'red',
                })
            }
    
            await withdrawTon({
                amount: tonAmount.toString()
            })

            addNotification({
                title: 'Success',
                message: "Withdraw TON successfully",
                theme: 'darkblue',
            })
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div class="absolute fixed p-10 w-full max-h-full z-50 top-10">
            <div class="relative rounded-lg shadow bg-white">
                <div class="justify-between p-4">
                    <h3 class="text-4xl text-[#3367D5] font-semibold">
                        Withdraw
                    </h3>
                    <img onClick={handleClose} className='absolute top-[1vh] right-[2vw]' src={close} />
                    <div class="">
                        <div class="border-b border-gray-900/10 pb-0 pt-[20px]">
                            <div className="grid grid-cols-4 gap-4 my-[10px]">
                                <div className='ml-[30px] w-[120px] text-left'>Balance</div>
                                <div className='ml-[120px] w-[120px] text-left'>{amount} TON</div>
                            </div>
                        </div>
                        <div class="flex mt-[20px] mx-auto rounded-3xl bg-[#808080] w-[200px] opacity-55 pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input value={tonAmount}  onChange={(e) => setTonAmount(e.target.value)} placeholder='Enter amount' type="number" className="text-center rounded-3xl bg-[#808080] opacity-55 block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-white placeholder:text-white focus:outline focus:outline-0 sm:text-sm/6"/>
                        </div>
                        <p class="text-black font-semibold mb-[30px]">
                            Minimum amount 0.1 TON
                        </p>
                    </div>

                    <button
                        disabled={loading ? true : false}
                        onClick={handleSubmit}
                        className="bottom-[3vh] my-5 rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-xl bg-[#3367D5]">
                        <div className="py-[1vh] text-white">
                            {loading ? "Loading..." : "Withdraw now!"}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupTon;