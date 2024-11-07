import React from 'react';
import './App.css'
import './index.css'
import ava from './assets/avatar.svg';
import checkIcon from './assets/check-icon.svg';
import shoppingCart from './assets/shopping-cart.svg';
import rectangle1071 from './assets/rectangle-1071.png';
import Navigation from './Components/Navigation';
import WebApp from '@twa-dev/sdk'
import {createUserStore} from "./api/user.api";

const user = {
    name: 'top1server',
    avatar: ava,
    balance: 666,
    friendsCount: 23432,
    checkin: true,
};

const Home = () => {
    const userInfo = createUserStore(state => state.userInfo)
    const checkedToday = createUserStore(state => state.checkedToday)
    const doLogin = createUserStore(state => state.checkIn)

    return (
        <div className="bg-[#1e1e1e] flex flex-row justify-center w-full h-full">
            <div className="bg-[#1e1e1e] overflow-hidden w-[430px] h-[858px] relative">
                <div className="absolute w-[329px] h-14 top-[660px] left-[50px] bg-white rounded-[20px] overflow-hidden">
                    <button 
                        disabled={checkedToday}
                        onClick={doLogin}
                        className="absolute w-[251px] top-[7px] left-[39px] font-adlam font-normal text-black text-[32px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        {checkedToday ? "Checked in" : "Check in"}
                    </button>
                </div>

                <div className="absolute w-[329px] h-14 top-[579px] left-[49px] bg-white rounded-[20px] overflow-hidden">
                    <div className="absolute w-[251px] top-[7px] left-[39px] font-adlam-display folt-normal text-black text-[32px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        Daily quizz
                    </div>
                </div>

                <div className="absolute w-[206px] h-[261px] top-[124px] left-[115px]">
                    <div className="absolute w-[165px] h-[181px] -top-2 left-[26px]">
                        <div className="absolute w-[156px] h-[181px] top-0 left-0">
                            <img
                                className="absolute w-[153px] h-[158px] top-0 left-[3px] object-cover"
                                alt="Avatar"
                                src={user.avatar}
                            />

                            <div className="absolute w-[140px] h-7 top-[150px] left-0 font-baloo font-bold text-white text-2xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                {WebApp.initDataUnsafe.user.username ?? WebApp.initDataUnsafe.user.first_name + WebApp.initDataUnsafe.user.last_name}
                            </div>
                        </div>

                        <div className="absolute w-[17px] h-[17px] top-[158px] left-[148px] bg-[url(/check-box.svg)] bg-[100%_100%]">
                            <div className="w-[11px] h-[13px]">
                                <div className="relative w-[17px] h-[17px] bg-white rounded-[8.5px]">
                                    <div className="absolute w-[13px] h-[13px] top-0.5 left-0.5 bg-[#4ecc5e] rounded-[6.5px]" />

                                    <img
                                        className="absolute w-[13px] h-[13px] top-0.5 left-0.5"
                                        alt="Check icon"
                                        src={checkIcon}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute w-[200px] h-9 top-[180px] left-0 font-baloo font-bold text-white text-5xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        {userInfo.points ?? 0} points
                    </div>

                    <div className="absolute w-[180px] top-[238px] left-2.5 font-nunito-bold font-bold text-white text-base text-center tracking-[0] leading-[normal]">
                        {userInfo.refCount ?? 0} referral
                    </div>
                </div>

                <div className="absolute w-[338px] h-[82px] top-[13px] left-[39px]">
                    <div className="flex flex-col w-16 items-center justify-center pl-1 pr-0 py-1 absolute top-7 left-[274px]">
                        <img
                            className="relative w-6 h-6"
                            alt="Shopping cart"
                            src={shoppingCart}
                        />

                        <div className="relative w-fit font-lato-regular font- text-variable-collection-ch text-white text-base tracking-[0.20px] leading-[22.4px] whitespace-nowrap">
                            Shop
                        </div>
                    </div>
                </div>

                <footer className="relative w-[453px] h-28 top-[745px] bg-variable-collection-n-n justify-centery">
                    <Navigation />
                </footer>

                <div className="absolute w-[329px] h-[145px] top-[410px] left-[51px]">
                    <div className="w-[329px] h-[145px]">
                        <img
                            className="relative w-[329px] h-[145px] object-cover center"
                            alt="Rectangle"
                            src={rectangle1071}
                        />
                        <div className="relative w-[77px] h-[34px] top-[-45px] left-[242px] bg-white rounded-[20px]" />
                    </div>
                    <div className="relative w-[57px] top-[-45px] left-[252px] font-adlam-display font-normal text-black text-xl text-center tracking-[0] leading-[normal]">
                        Play
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;