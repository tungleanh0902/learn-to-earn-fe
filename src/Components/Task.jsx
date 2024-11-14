import React, { useState } from 'react';
import tonwallet from '../assets/Tonwallet.png'; // Adjust the import path as needed
import social from '../assets/social.png';// Adjust the import path as needed
import academy from '../assets/academy.png'; // Adjust the import path as needed
import x from '../assets/x.png'; // Adjust the import path as needed
import { createSocialTaskStore } from "../api/socialTask.api";
import { createUserStore } from "../api/user.api";
import { useTonConnectUI, useTonWallet, CHAIN } from "@tonconnect/ui-react";
import { useNavigate } from 'react-router-dom';

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

const Task = ({handleClickActive}) => {
    const activeTask = createSocialTaskStore(state => state.activeTasks)
    const token = createUserStore(state => state.token)
    const updateUserInfo = createUserStore(state => state.updateUserInfo)
    const claim = createSocialTaskStore(state => state.claimSocialTask)
    const connectWallet = createUserStore(state => state.connectWallet)
    const getActiveTask = createSocialTaskStore(state => state.getActiveTasks)
    const navigate = useNavigate();
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();

    if (activeTask.length == 0) {
        handleClickActive(0)
        navigate("/");
    }

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
        if (platform != "wallet") {
            window.open(link, '_blank');
        }
        await onConnectWallet(platform)
        let newUser = await claim(taskId, token)
        await updateUserInfo(newUser)
        await getActiveTask(token)
    }

    async function onConnectWallet(platform) {
        try {
            if (platform == "wallet") {
                if (wallet) {
                    await tonConnectUI.disconnect()
                }
                await tonConnectUI.openModal()
                tonConnectUI.onStatusChange(async w => {
                    if (w.account?.address) {
                        await connectWallet({
                            address: w.account.address
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative">
            <ul className="relative flex items-center px-[5vw]">
                {category.map((category, i) => (
                    <li key={i} className={`cursor-pointer ${active === i ? 'text-white' : 'text-gray-500'}`} onClick={() => handleClick(i, category.name)}>
                        <a className="block px-[5vw] py-2 font-adlam-display">
                            {capitalizeFirstLetter(category.name)}
                        </a>
                    </li>
                ))}
            </ul>
            <ul className="relative max-h-[49vh] overflow-y-auto">
                {filteredTaskItems.map((task, i) => (
                    <li key={i} className="relative pl-[10vw] items-center grid grid-cols-4 mar margin-task">
                        <img src={getImage(task.platform)} alt={task.title} className="w-6 h-6" />
                        <span className="relative text-white pl-[2vw] font-abeezee col-start-2 col-span-2 text-left left-[-15vw] py-[3vh">{task.title}</span>
                        <span className="relative w-[80px] h-[23px] bg-[#d9d9d9] rounded-[20px] col-start-4 col-span-1 right-[4vw]">
                            <button
                                disabled={task.isDone}
                                onClick={() => onClaimTask(task._id, task.platform, task.link)}
                                className="relative text-black font-adlam-display pt-[-1.5px]">
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