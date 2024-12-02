import React, { useState, useEffect } from "react";
import PointsPopUp from './Components/Popups/PointsPopUp';
import { useNavigate } from 'react-router-dom';

import gamebg from "./assets/game-bg.png";
import frame from "./assets/frame.png";
import dropgame from "./assets/drop-game.svg";

import { createWordGameStore } from "./api/wordGame.api";
import { createUserStore } from "./api/user.api";

const Game = () => {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [gameTime, setGameTime] = useState(35);
    const [gameRunning, setGameRunning] = useState(false);
    const [words, setWords] = useState([]);
    const [choosenWordIds, setChoosenWordIds] = useState([])
    const [topic, setTopic] = useState("")
    const [isDefault, setIsDefault] = useState(true)
    const [isInvisible, setIsInvisible] = useState([]); // Initialize boolean array
    const [popUpVisible, setPopupVisible] = useState(true);

    const token = createUserStore(state => state.token)
    const userInfo = createUserStore(state => state.userInfo)
    const updateUserInfo = createUserStore(state => state.updateUserInfo)
    const answerWordGame = createWordGameStore(state => state.answerWordGame);
    const game = createWordGameStore(state => state.game);
    const getGame = createWordGameStore(state => state.getGame);
    const [isActive, setIsActive] = useState(false);
    const [newPoint, setNewPoint] = useState("0");
    const [isTon, setIsTon] = useState(false);


    const startGame = async () => {
        let gameState = await getGame(token)
        setWords(gameState.challenge)
        setTopic(gameState.topic.content)
        setGameRunning(true);
        setItems([]);
        setGameTime(35);
        setIsInvisible(new Array(gameState.challenge.length).fill(false));
    };

    const closePopUp = () => {
        setPopupVisible(false);
    };

    const handleCatch = async (item, index) => {
        isInvisible[index] = false; // Xóa vật phẩm đã bắt
        setChoosenWordIds((prevItem) => [...prevItem, item._id.toString()])
        setIsDefault(true)
        if (item.topicIds.includes(game.topic._id.toString())) {
            await openPopUp(false, "+1", 700)
        } else {
            await openPopUp(false, "-1", 700)
        }
    };

    // Logic tạo vật phẩm rơi 
    useEffect(() => {
        if (gameRunning) {
            let itemIdx = 0;
            words[itemIdx].left = Math.floor(Math.random() * 50) + "vw"
            words[itemIdx].index = itemIdx
            isInvisible[itemIdx] = true;
            const interval = setInterval(() => {
                words[itemIdx + 1].left = Math.floor(Math.random() * 50) + "vw"
                words[itemIdx + 1].index = itemIdx + 1
                isInvisible[itemIdx + 1] = true;
                console.log(words[itemIdx]);
                if (words[itemIdx]) {
                    setItems((prevItems) => [...prevItems, words[itemIdx]]);
                }
                itemIdx += 1
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameRunning]);

    useEffect(() => {
        async function fetch() {
            if (gameRunning && gameTime > 0) {
                const timer = setTimeout(() => setGameTime(gameTime - 1), 1000);
                return () => clearTimeout(timer);
            } else if (gameTime === 0) {
                setGameRunning(false);
                let data = await answerWordGame(choosenWordIds, game.topic._id.toString(), token)
                updateUserInfo(data.user)
                setIsDefault(false)
                await openPopUp(false, "+"+data.points, 2000)
                await wait(500)
                if (data.bonusTon) {
                    await openPopUp(true, "+"+data.bonusTon, 2000)
                }
            }
        }
        fetch()
    }, [gameTime, gameRunning]);

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function openPopUp(isTon, points, timeout) {
        setIsTon(isTon)
        setNewPoint(points)
        setIsActive(true)
        await wait(timeout)
        setIsActive(false)
        setNewPoint("0")
        setIsTon(false)
    }

    const handleBack = () => {
        navigate("/earn");
    }

    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen h-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-[90vh] relative">
                {
                    isActive ?
                        <PointsPopUp
                            points={newPoint}
                            isActive={isActive}
                            isTon={isTon}
                            isDefault={isDefault}
                        />
                        :
                        <></>
                }
                <div className="absolute top-[5vh] left-[5vw] text-3xl font-bold font-baloo text-white">Satori Drop</div>

                {gameRunning ?
                    <>
                        <div 
                        className="relative w-[100vw] h-[90vh] mx-auto overflow-hidden"
                        style={{
                            backgroundImage: `url(${dropgame})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}>
                            <div className="absolute top-[5vh] right-[5vw] text-xl font-bold font-baloo text-white z-40 bg-black p-[10px] rounded-xl">Topic: {topic}</div>
                            <div className="absolute top-[10vh] left-[5vw] text-3xl font-bold font-baloo text-white">Satori Drop</div>

                            {items.map((item) => (
                                isInvisible[item?.index] && (
                                    <div
                                        className="absolute text-[36px] font-bold animate-fall text-black bg-white bg-opacity-80 backdrop-blur-xl p-[10px] rounded-[10%]"
                                        style={{ left: item?.left }}
                                        onClick={() => handleCatch(item, item?.index)}
                                    >
                                        {item?.content}
                                    </div>
                                )
                            ))}
                        </div>
                        <p className="text-white ">Time Remaining: {gameTime}s</p>
                    </>
                    :
                    <>
                        <button
                            className="px-4 py-2 text-3xl cursor-pointer bg-[#ffffff] text-black border-none rounded-[20px] absolute top-[30vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-baloo font-bold"
                            onClick={startGame}
                            disabled={userInfo?.tickets <= 0}
                        >
                            {userInfo?.tickets > 0 ? "Start Game" : "Out of ticket"}
                        </button>
                        <button
                            className="px-4 py-2 text-xl cursor-pointer text-white border-none rounded-[20px] absolute top-[38vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-baloo font-bold"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <div className="w-[100vw] h-[90vh] mx-auto"
                            style={{
                                backgroundImage: `url(${dropgame})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                    </>
                }

                {popUpVisible && (
                    <div 
                    className=" inset-0 flex items-center justify-center fixed"
                    onClick={closePopUp}>
                        <div className="bg-[#0088cc] w-[80vw] h-[70vh] rounded-[20px] relative ">
                            <div className="pt-[3vh] relative"></div>
                            <div className="font-adlam text-white font-medium text-4xl relative">Satori Drop</div>
                            <div className="pt-[2vh] relative"></div>
                            <div className="font-baloo text-white font-bold text-xl">How to play?</div>

                            <div className="label">
                                <p className ="text-white text-left pl-[10vw] pr-[5vw] text-sm font-afacad-variable">
                                    <div className="list-item">Words in Japanese will fall from the top of the screen</div>
                                    <div className="list-item">Your job is to catch the right words that match the theme or meaning.</div>
                                    <div className="list-item">If you miss or pick the wrong word, you lose points or time.</div>
                                    <div className="list-item">Score more than 1000 points to have a chance to earn TON.</div>
                                </p>
                            </div>

                            <div className="absolute bottom-[5vh] left-[15vw] right-[15vw] items-center">
                                <div className="text-white font-abeezee text-sm">Invite 5/3 friends to earn TON</div>
                                <div className="bg-white rounded-[18px] px-[1vw] max-w-[100%]">
                                    <div className="font-adlam text-2xl px-[5vw] py-[0.7vh]">Let's go !!!🚀</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;