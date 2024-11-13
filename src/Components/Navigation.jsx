import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lighthome from '../assets/lighthome.svg';
import lightearn from '../assets/lightearn.svg';
import lightlearn from '../assets/lightlearn.svg';
import home from '../assets/home.png';
import earn from '../assets/earn.svg';
import learn from '../assets/learn.svg';
import leaderboard from '../assets/leaderboard.svg';
import wallet from '../assets/wallet.png';

const Navigation = ({active, handleClickActive, setIsCampaign}) => {
    const Menus = [
        { name: "Home", img: home, lightimg: lighthome, path: "/" },
        { name: "Earn", img: earn, lightimg: lightearn, path: "/earn" },
        { name: "Learn", img: learn, lightimg: lightlearn, path: "/learn" },
        { name: "Leaderboard", img: leaderboard, path: "/leaderboard" },
        { name: "Shop", img: wallet, lightimg: wallet, path: "/shop" },
    ];
    const navigate = useNavigate();

    const handleClick = (index, path) => {
        handleClickActive(index)
        navigate(path);
        setIsCampaign(false)
    };

    return (
        <div className="bg-[#1e1e1e] w-[100vw]">
            <ul className="flex relative top-[-2vh] justify-between items-center px-4">
                {Menus.map((menu, i) => (
                    <li key={i} className={`cursor-pointer ${active === i ? 'text-white' : 'text-gray-500'}`} onClick={() => handleClick(i, menu.path)}>
                        <a className="px-1 font-adlam-display">
                            <img src={(active === i) ? menu.lightimg : menu.img} alt={menu.name} className="mx-auto" />
                        </a>
                        <span></span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigation;
