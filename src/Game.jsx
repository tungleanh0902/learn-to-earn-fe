import React, { useState, useEffect } from "react";
import PointsPopUp from './Components/PointsPopUp';
import { useNavigate } from 'react-router-dom';

import gamebg from "./assets/game-bg.png";
import frame from "./assets/frame.png";

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
    };

    const handleCatch = async (item) => {
        setItems(items.filter((i) => i !== item)); // Xóa vật phẩm đã bắt
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
            let itemIdx = 0
            const interval = setInterval(() => {
                words[itemIdx].left = Math.floor(Math.random() * 50) + "vw"
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
        navigate("/");
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
                {gameRunning ?
                    <>
                        <p className="text-white">Topic: {topic}</p>
                        <div 
                        className="relative w-[90vw] h-[80vh] mx-auto border-2 border-[#ccc] overflow-hidden rounded-[10px]"
                        style={{
                            backgroundImage: `url(${frame})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}>
                            {items.map((item) => (
                                <div
                                    className="absolute text-[36px] font-bold animate-fall text-[#333] bg-[rgba(255,255,255,0.8)] p-[10px] rounded-[10%]"
                                    style={{ left: item?.left }}
                                    onClick={() => handleCatch(item)}
                                >
                                    {item?.content}
                                </div>
                            ))}
                        </div>
                        <p className="text-white ">Time Remaining: {gameTime}s</p>
                    </>
                    :
                    <>
                        <game-button disabled={userInfo?.tickets > 0 ? false : true} onClick={startGame}>{userInfo?.tickets > 0 ? "Start Game" : "Out of ticket"}</game-button>
                        <back-button onClick={handleBack}>Back</back-button>
                        <img className="w-[90vw] h-[90vh] mx-auto border-2 border-[#ccc] rounded-[10px]"
                            alt="Game Background"
                            src={frame}
                        ></img>
                    </>
                }
            </div>
        </div>
    );
};

export default Game;