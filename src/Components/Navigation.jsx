import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import earn from '../assets/earn.svg';
import learn from '../assets/learn.svg';
import leaderboard from '../assets/leaderboard.svg';
import wallet from '../assets/wallet.png';

const Navigation = () => {
    const navigate = useNavigate();
    const Menus = [
        { name: "Home", img: home, path: "/" },
        { name: "Earn", img: earn, path: "/earn" },
        { name: "Learn", img: learn, path: "/learn" },
        { name: "Leaderboard", img: leaderboard, path: "/leaderboard" },
        { name: "Wallet", img: wallet, path: "/wallet" },
    ];
    const [active, setActive] = useState(0);

    const handleClick = (index, path) => {
        setActive(index);
        navigate(path);
    };

    return (
        <div className="bg-[#1e1e1e]">
            <ul className="flex justify-between items-center px-4">
                {Menus.map((menu, i) => (
                    <li key={i} className={`cursor-pointer ${active === i ? 'text-white' : 'text-gray-500'}`} onClick={() => handleClick(i, menu.path)}>
                        <a className="px-1 font-adlam-display">
                            <img src={menu.img} alt={menu.name} className="mx-auto" />
                        </a>
                        <span></span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigation;
