import React, { useState } from 'react';
import tonwallet from '../assets/Tonwallet.png'; // Adjust the import path as needed
import social from '../assets/social.png';// Adjust the import path as needed
import academy from '../assets/academy.png'; // Adjust the import path as needed
import { createSocialTaskStore } from "../api/socialTask.api";
import { createUserStore } from "../api/user.api";

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

// TODO: get more icon: x, hoi vader
function getImage(platform) {
    switch (platform) {
        case "wallet":
            return tonwallet
        case "youtube":
            return academy
        case "telegram":
            return social
        default:
            break;
    }
}


const Task = () => {
    const activeTask = createSocialTaskStore(state => state.activeTasks)
    const token = createUserStore(state => state.token)
    const claim = createSocialTaskStore(state => state.claimSocialTask)

    let taskTag = []
    activeTask.map((task, x) => {
        taskTag.push({ "name": task.tag })
    });

    let category = taskTag.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === taskTag.findIndex(obj => {
            return JSON.stringify(obj) === _value;
        });
    });
    category.unshift({ name: "all" })

    const [active, setActive] = useState(0);
    const [categoryState, setCategoryState] = useState("all");

    const handleClick = (index, category) => {
        setActive(index);
        setCategoryState(category);
    }

    const filteredTaskItems = categoryState === "all"
        ? activeTask
        : activeTask.filter(task => task.tag === categoryState);
    
    console.log(filteredTaskItems);
    return (
        <div className="overflow-hidden">
            <ul className="flex space-x-1">
                {category.map((category, i) => (
                    <li key={i} className={`cursor-pointer ${active === i ? 'text-white' : 'text-gray-500'}`} onClick={() => handleClick(i, category.name)}>
                        <a className="block px-4 py-2 font-adlam-display">
                            {capitalizeFirstLetter(category.name)}
                        </a>
                    </li>
                ))}
            </ul>
            <ul className="flex flex-col space-y-1 max-h-60 overflow-y-auto overflow-x-hidden">
                {filteredTaskItems.map((task, i) => (
                    <li key={i} className="relative flex items-center space-y-5 left-[15px]">
                        <img src={getImage(task.platform)} alt={task.title} className="w-6 h-6" />
                        <span className="relative text-white font-abeezee left-[10px] top-[-10px]">{task.title}</span>
                        <span className="absolute w-[80px] h-[23px] top-[-10px] right-[70px] bg-[#d9d9d9] rounded-[20px]">
                            <button 
                                onClick={() => claim(task._id, token)}
                                className="relative text-black font-adlam-display top-[-1.5px]">
                                Go
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Task;