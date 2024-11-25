import React, { useState, useEffect } from "react";

import gamebg from "./assets/game-bg.png";

import { createWordGameStore } from "./api/wordGame.api";

const Game = ({ onPointsUpdate, onGameEnd }) => {
    const [answers, setAnswers] = useState([]);
    const [items, setItems] = useState([]);
    const [gameTime, setGameTime] = useState(30); // game duration in seconds
    const [gameRunning, setGameRunning] = useState(false);
    const [points, setPoints] = useState(0); // Tổng điểm
    const [giftPoints, setGiftPoints] = useState(0); // Điểm riêng từ quà

    const game = createWordGameStore(state => state.game);

    const japaneseNumbers = (game?.challange ?? [
        "1"
    ]); // Số tiếng Nhật

    let giftRate = 0.2;
    let multiplier = 1;
    const ref = 10;

    if (ref >= 10) {
        giftRate = 0.01 + (ref - 10) * 0.0001;
        multiplier += ref * 0.02;
        if (multiplier >= 5) {
            multiplier = 5;
        }
        if (giftRate >= 0.2) {
            giftRate = 0.2;
        }
    }

    const getRandomGiftPoints = () => {
        const points = [0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008];
        const weights = [30, 25, 20, 10, 8, 5, 2, 1]; // Trọng số
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

        const random = Math.random() * totalWeight;
        let cumulativeWeight = 0;

        for (let i = 0; i < points.length; i++) {
            cumulativeWeight += weights[i];
            if (random <= cumulativeWeight) {
                return points[i];
            }
        }
        return points[0];
    };

    const startGame = () => {
        setGameRunning(true);
        setItems([]);
        setGameTime(30);
        setPoints(0);
        setGiftPoints(0);
    };

    const handleCatch = (item, answerId) => {
        setItems(items.filter((i) => i !== item)); // Xóa vật phẩm đã bắt

        if (item.type === "gift") {
            // Nếu là hộp quà
            const earnedGiftPoints = getRandomGiftPoints(); // Lấy điểm từ hộp quà
            const newGiftPoints = parseFloat((giftPoints + earnedGiftPoints).toFixed(6));
            setGiftPoints(newGiftPoints);
        } else if (item.type === "bomb") {
            // If it's a bomb
            const reducedPoints = Math.floor(points / 2); // Reduce total points by 50%
            setPoints(reducedPoints);
            setGiftPoints(0); // Erase gift points
            onPointsUpdate(reducedPoints);
        } else {
            const earnedPoints = (japaneseNumbers.indexOf(item.content) + 1) * multiplier;
            const newPoints = points + earnedPoints;
            setPoints(newPoints);
            onPointsUpdate(newPoints); // Cập nhật tổng điểm
        }
    };

    // Logic tạo vật phẩm rơi 
    useEffect(() => {
        if (gameRunning) {
            const interval = setInterval(() => {
                const randomType = Math.random();
                let newItem;

                if (randomType < 0.1) {
                    newItem = {
                        id: Math.random(),
                        left: Math.floor(Math.random() * 50) + "vw",
                        top: "0vh",
                        type: "bomb",
                        content: "💣", // Bomb icon
                    };
                } else if (randomType < 0.2) {
                    newItem = {
                        id: Math.random(),
                        left: Math.floor(Math.random() * 50) + "vw",
                        top: "0vh",
                        type: "gift",
                        content: "🎁", // Gift icon
                    };
                } else {
                    newItem = {
                        id: Math.random(),
                        left: Math.floor(Math.random() * 50) + "vw",
                        top: "0vh",
                        type: "number",
                        content: japaneseNumbers[Math.floor(Math.random() * japaneseNumbers.length)],
                    };
                }
                setItems((prevItems) => [...prevItems, newItem]);
            }, 200); //rate 
            return () => clearInterval(interval);
        }
    }, [gameRunning]);

    useEffect(() => {
        if (gameRunning && gameTime > 0) {
            const timer = setTimeout(() => setGameTime(gameTime - 1), 1000);
            return () => clearTimeout(timer);
        } else if (gameTime === 0) {
            onGameEnd(points); // Gửi điểm cuối cùng đến component cha
            setGameRunning(false);
            console.log("Game Over! Your total points: ", points, giftRate);
        }
    }, [gameTime, gameRunning, onGameEnd, points]);

    const restartGame = () => {
        setGameRunning(false); // Stop the game
        setItems([]); // Clear all falling items
        setGameTime(30); // Reset the timer
        setPoints(points); // Reset total points
        setGiftPoints(giftPoints); // Reset gift points
    };

    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen h-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-[90vh] relative">


                    <game-button onClick={startGame}>Start Game</game-button>
                    <game-button onClick={restartGame} disabled={!gameRunning}>Next Game</game-button>
                    {gameRunning?(

                    <div className="relative w-[70vw] h-[70vh] mx-auto bg-[#e0e0e0] border-2 border-[#ccc] overflow-hidden rounded-[10px]">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`absolute text-[36px] font-bold animate-fall text-[#333] bg-[rgba(255,255,255,0.8)] p-[10px] rounded-[10%] ${item.type === "gift" ? "gift-item" : ""}`}
                                style={{ left: item.left }}
                                onClick={() => handleCatch(item)}
                            >
                                {item.content} {/* Hiển thị số hoặc hộp quà */}
                            </div>
                        ))}
                    </div>) : 
                    (<img 
                        className="w-[70vw] h-[70vh] mx-auto border-2 border-[#ccc] rounded-[10px]"
                        alt="Game Background"
                        src={gamebg}
                        ></img>

                    )}

                <p className="text-white ">Time Remaining: {gameTime}s</p>
                <p className="text-white">Total Points: {points}</p>
                <p className="text-white">Gift Points: {giftPoints}</p>
            </div>
        </div>
    );
};

export default Game;