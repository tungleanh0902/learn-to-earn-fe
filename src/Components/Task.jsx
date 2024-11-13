import React, { useState } from 'react';
import tonwallet from '../assets/Tonwallet.png'; // Adjust the import path as needed
import social from '../assets/social.png';// Adjust the import path as needed
import academy from '../assets/academy.png'; // Adjust the import path as needed
import x from '../assets/x.png'; // Adjust the import path as needed
import { createSocialTaskStore } from "../api/socialTask.api";
import { createUserStore } from "../api/user.api";
import { useTonConnectUI, useTonWallet, CHAIN } from "@tonconnect/ui-react";

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
        case "x":
            return x
        default:
            break;
    }
}

const Task = () => {
    const activeTask = createSocialTaskStore(state => state.activeTasks)
    const token = createUserStore(state => state.token)
    const updateUserInfo = createUserStore(state => state.updateUserInfo)
    const claim = createSocialTaskStore(state => state.claimSocialTask)
    const connectWallet = createUserStore(state => state.connectWallet)
    const getActiveTask = createSocialTaskStore(state => state.getActiveTasks)

    const [tonConnectUI] = useTonConnectUI();

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

    async function onClaimTask(taskId, platform, link) {
        window.open(link, '_blank').focus();
        onConnectWallet(platform)
        let newUser = await claim(taskId, token)
        console.log(newUser);
        await updateUserInfo(newUser)
        await getActiveTask(token)
    }

    async function onHandleChangeWallet(platform) {
        await tonConnectUI.disconnect()
        onConnectWallet(platform)
    }

    async function onConnectWallet(platform) {
        try {
            if (platform == "wallet") {
                tonConnectUI.openModal()
                tonConnectUI.onStatusChange(async w => {
                    if (w.account?.address) {
                        await connectWallet({
                            address: w.account.address
                        }, token)
                    }
                })
            }
            await connectWallet({ address: w.account.address })
        } catch (error) {
            console.log(error);
        }
    }

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
            <ul className="flex flex-col space-y-1 overflow-y-auto overflow-x-hidden bottom-[100px]">
                {filteredTaskItems.map((task, i) => (
                    <li key={i} className="relative flex items-center space-y-5 left-[15px]">
                        <img src={getImage(task.platform)} alt={task.title} className="w-6 h-6" />
                        <span className="relative text-white font-abeezee left-[10px] top-[-10px]">{task.title}</span>
                        {
                            task.isDone && task.platform == "wallet" ?
                                <span className="absolute w-[80px] h-[23px] top-[-10px] right-[160px] bg-[#d9d9d9] rounded-[20px]">
                                    <button
                                        onClick={() => onHandleChangeWallet(task.platform)}
                                        className="relative text-black font-adlam-display top-[-1.5px]">
                                        Connect
                                    </button>
                                </span> :
                                <></>
                        }
                        <span className="absolute w-[80px] h-[23px] top-[-10px] right-[70px] bg-[#d9d9d9] rounded-[20px]">
                            <button
                                disabled={task.isDone}
                                onClick={() => onClaimTask(task._id, task.platform, task.link)}
                                className="relative text-black font-adlam-display top-[-1.5px]">
                                {task.isDone ? "Claimed" : "Go"}
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Task;