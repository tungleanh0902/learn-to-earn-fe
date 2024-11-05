import React, { useState } from 'react';
import tonwallet from '../assets/Tonwallet.png'; // Adjust the import path as needed
import social from '../assets/social.png';// Adjust the import path as needed
import academy from '../assets/academy.png'; // Adjust the import path as needed

const Task = () => {
    const Categories = [
        { name: "All" }, 
        { name: "Onchain" },
        { name: "Academy" },
        { name: "Social"},    
    ];

    const TaskItems = [
        { name: "Connect Ton Wallet", categoryType: "Onchain", activity: "Connect", img: tonwallet },
        { name: "Follow Our Channel", categoryType: "Social", img: social, activity: "Start" },
        { name: "Join Our Group Chat", categoryType:"Social", img: social, activity: "Verify" },
        { name: "11/1 Lesson", categoryType: "Academy", img: academy, activity: "Claim" },
        { name: "11/2 Lesson", categoryType: "Academy", img: academy, activity: "Claim" },
        { name: "Subscribe our channel", categoryType: "Social", img: academy, activity: "Verify" },
    ]

    const [active, setActive] = useState(0);
    const [categoryState, setCategoryState] = useState("All");

    const handleClick = (index, category) => {
        setActive(index);
        setCategoryState(category);
    }

    const filteredTaskItems = categoryState === "All" 
        ? TaskItems 
        : TaskItems.filter(task => task.categoryType === categoryState);

    return (
        <div className="overflow-hidden">
            <ul className="flex space-x-1">
                {Categories.map((category, i) => (
                    <li key={i} className={`cursor-pointer ${active === i ? 'text-white' : 'text-gray-500'}`} onClick={() => handleClick(i, category.name)}>
                        <a className="block px-4 py-2 font-adlam-display">
                            {category.name}
                        </a>
                    </li>
                ))}
            </ul>
            <ul className="flex flex-col space-y-1 max-h-60 overflow-y-auto overflow-x-hidden">
                {filteredTaskItems.map((task, i) => (
                    <li key={i} className="relative flex items-center space-y-5 left-[15px]">
                        <img src={task.img} alt={task.name} className="w-6 h-6" />
                        <span className="relative text-white font-abeezee left-[10px] top-[-10px]">{task.name}</span>
                        <span className="absolute w-[80px] h-[23px] top-[-10px] right-[70px] bg-[#d9d9d9] rounded-[20px]">
                            <div className="relative text-black font-adlam-display top-[-1.5px]">
                                {task.activity}
                            </div>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Task;