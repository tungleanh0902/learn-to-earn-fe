import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import earn from '../assets/earn.svg';
import learn from '../assets/learn.svg';
import leaderboard from '../assets/leaderboard.svg';
import wallet from '../assets/wallet.png';

const Navigation = () => {
    const navigate = useNavigate();
    const Menus = [
        { name: "Home", dis: "translate-x-0", img: home, path: "/" },
        { name: "Earn", dis: "translate-x-16", img: earn, path: "/earn" },
        { name: "Learn", dis: "translate-x-32", img: learn, path: "/learn" },
        { name: "Leaderboard", dis: "translate-x-48", img: leaderboard, path: "/leaderboard" },
        { name: "Wallet", dis: "translate-x-64", img: wallet, path: "/wallet" },
    ];
    const [active, setActive] = useState(0);

    const handleClick = (index, path) => {
        setActive(index);
        setTimeout(() => {
            navigate(path);
        }, 1000); // 1000ms delay before navigating
    };

    return (
        <div className="bg-[#1e1e1e] max-h-[4.6rem] px-7 rounded-t-xl">
            <ul className="flex relative">
                {Menus.map((menu, i) => (
                    <li key={i} className="w-[75px]">
                        <a
                            className="flex flex-col text-center pt-6 cursor-pointer"
                            onClick={() => handleClick(i, menu.path)}
                        >
                            <span className={`text-xl cursor-pointer duration-500 ${i === active && "text-white"}`}>
                                <img
                                    src={menu.img}
                                    alt={menu.name}
                                    className={`${i === active ? "w-5 h-5" : "w-5 h-5"} mx-auto`}
                                />
                            </span>
                            <span className={`${active === i ? "translate-y-2 duration-700 opacity-100" : "opacity-0 translate-y-10"}`}>
                                <div className="text-white">{menu.name}</div>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigation;
