import React, { useEffect } from 'react';

import share from './assets/share-icon.png';
// import top1 from './assets/top1.svg';
import top1 from './assets/top1.png';
import top2 from './assets/top2.png';
import top3 from './assets/top3.png';

import { useNavigate } from 'react-router-dom';
import { createUserStore } from "./api/user.api";
import { createSocialTaskStore } from "./api/socialTask.api";
import { createSeasonBadgeStore } from "./api/seasonBadge.api";

const Leaderboard = ({ handleClickActive }) => {
    const navigate = useNavigate();

    const leaderboard = createUserStore(state => state.leaderboard);
    const userInfo = createUserStore(state => state.userInfo);
    const activeTask = createSocialTaskStore(state => state.activeTasks);
    const checkBoughtSeasonBadge = createSeasonBadgeStore(state => state.checkBoughtSeasonBadge);

    if (activeTask.length === 0) {
        handleClickActive(0);
        navigate("/");
    }

    const handleCopyLink = () => {
        const inviteLink = `${import.meta.env.VITE_INVITE_URL}?startapp=${WebApp.initDataUnsafe.user.id.toString()}`;
        navigator.clipboard.writeText(inviteLink);
        alert('Invite link copied to clipboard!');
    };

    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen h-screen">
            <div className="bg-[#1e1e1e] overflow-y-hidden overflow-x-auto w-screen h-[90vh] relative">
                <div className="relative pt-[6vh]"></div>

                <button
                    className="fixed top-[6vh] right-[5vw]"
                    onClick={() => handleCopyLink()}
                >
                    <img
                        className=""
                        src={share}
                        alt="Share icon"
                    />
                    <div className="relative text-white font-adlam-display font-thin text-xs">Share</div>
                </button>

                <div className="relative bg-white rounded-[25px] w-[65vw] items-center mx-auto">
                    <div className="py-[2vh] grid grid-cols-4">
                        <div className="col-span-1 col-start-1 font-nats font-bold">
                            {leaderboard?.currentRank ?? -1}
                        </div>
                        <div className="col-span-2 col-start-2 font-nats font-bold">You</div>
                        <div className="col-start-4 font-nats pr-[10vw] text-[#312244]">
                            {userInfo?.points ?? 0}
                        </div>
                    </div>
                </div>
                <div className="relative grid grid-cols-3 pt-[5vh] w-[80vw] items-center mx-auto">
                    <div className="col-start-1 col-span-1 items-center mx-auto">
                        <img
                            className="text-center"
                            src={top2}
                            alt="Top 2"
                        />

                        <div className="text-white font-nats text-xl text-center">
                            {shortName(leaderboard?.leaderboard && leaderboard?.leaderboard[1]?.username) ?? "Vatani"}
                        </div>

                        <div className="text-[#ffffff]/[70%] font-nats">
                            {leaderboard?.leaderboard && leaderboard?.leaderboard[1]?.points} pts
                        </div>
                    </div>

                    <div className="col-start-2 col-span-1 items-center mx-auto">
                        <img
                            className="relative scale-70"
                            src={top1}
                            alt="Top 1"
                        ></img>

                        <div className="text-white font-nats text-xl">
                            {shortName(leaderboard?.leaderboard && leaderboard?.leaderboard[0]?.username)}
                        </div>

                        <div className="text-[#ffffff]/[70%] font-nats">
                            {leaderboard?.leaderboard && leaderboard?.leaderboard[0]?.points} pts
                        </div>
                    </div>

                    <div className="col-start-3 col-span-1 items-center mx-auto">
                        <img
                            className=""
                            src={top3}
                            alt="Top 3"
                        />

                        <div className="text-white font-nats text-xl">
                            {shortName(leaderboard?.leaderboard && leaderboard?.leaderboard[2]?.username) ?? "Jonathan"}
                        </div>

                        <div className="text-[#ffffff]/[70%] font-nats">
                            {leaderboard?.leaderboard && leaderboard?.leaderboard[2]?.points} pts
                        </div>
                    </div>
                </div>

                <div className="pt-[3vh]"></div>

                <div className="max-h-[37vh] overflow-y-auto">
                    {leaderboard?.leaderboard && leaderboard?.leaderboard
                        .filter((item, index) => {
                            if (checkBoughtSeasonBadge && leaderboard?.currentRank >= 11 && leaderboard?.currentRank <= 13) {
                                return (index >= 3 && index <= leaderboard?.currentRank + 1);
                            }
                            return index >= 3 && index <= 10;
                        })
                        .map((item, index) => {
                            let bgColor;
                            let textColor = index >= 0 ? 'text-[#ffffff]/[70%]' : 'text-[#312244]/[70%]';
                            let nameColor = index >= 0 ? 'text-[#ffffff]' : 'text-[#312244]';

                            return (
                                <div key={index} className="relative rounded-[25px] w-[70vw] items-center mx-auto my-2" style={{ backgroundColor: bgColor }}>
                                    <div className={`py-[2vh] grid grid-cols-4 ${textColor}`}>
                                        <div className="font-nats text-2xl font-bold col-span-1">{item.rank}</div>
                                        <div className={`font-nats font-normal text-2xl col-span-2 ${nameColor}`}>{item.username ?? "sampleName"}</div>
                                        <div className="font-nats text-2xl right-[5px] items-baseline">{item.points}</div>
                                    </div>
                                </div>
                            );
                        })}

                    {checkBoughtSeasonBadge && leaderboard?.currentRank >= 14 ? (
                        <div className="relative">
                            <div className="relative text-white">...</div>

                            {leaderboard?.usersNearCurrentRank.map((item, index) => {
                                if (item!=null) return <div key={index} className="relative rounded-[25px] w-[70vw] items-center mx-auto my-2">
                                    <div className="py-[2vh] grid grid-cols-4 text-[#ffffff]/[70%]">
                                        <div className="font-nats font-bold col-span-1">{leaderboard?.currentRank - 2 + index}</div>
                                        <div className="font-nats font-medium col-span-2 text-[#ffffff]">{item.username ?? "sampleName"}</div>
                                        <div className="font-nats right-[5px] items-baseline">{item.points}</div>
                                    </div>
                                </div>
                            })}
                        </div>
                    ) : null}

                </div>

            </div>
        </div>
    );
};

export default Leaderboard;
