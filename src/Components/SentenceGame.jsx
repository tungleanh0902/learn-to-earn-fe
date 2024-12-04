import React, { useEffect, useState } from 'react';
import { createSentenceGameStore } from '../api/sentenceGame.api';
import { createUserStore } from '../api/user.api';
import { createPortal } from 'react-dom'
import kanjimaster from '../assets/kanji_master.svg';
import { useNavigate } from 'react-router-dom';

const SentenceGame = () => {
    const navigate = useNavigate();

    // const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    const [selectedMeaning, setSelectedMeaning] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [randomItems, setRandomItems] = useState([]);
    const [shuffledPhrases, setShuffledPhrases] = useState([]);
    const [currentMeanings, setCurrentMeanings] = useState([]);
    const [items, setItems] = useState([]);
    const [gameRunning, setGameRunning] = useState(false);
    const [gameTime, setGameTime] = useState(30);
    const [isMeaningDisable, setIsMeaningDisable] = useState([]);
    const [isPhraseDisable, setIsPhraseDisable] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [pairCount, setPairCount] = useState(0);
    const [choosenPhraseIds, setChoosenPhraseIds] = useState([]);
    const [choosenMeaningIds, setChoosenMeaningIds] = useState([]);
    const [itemId, setItemId] = useState([]);

    const token = createUserStore(state => state.token);
    // console.log(token);
    const userInfo = createUserStore(state => state.userInfo);
    const updateUserInfo = createUserStore(state => state.updateUserInfo);
    const answerSentenceGame = createSentenceGameStore(state => state.answerSentenceGame);
    const getGame = createSentenceGameStore(state => state.getGame);
    const game = createSentenceGameStore(state => state.game);

    const incrementPairCount = () => {
        setPairCount(prevInt => prevInt + 1);
    };

    const incrementCurrentQuestion = () => {
        setCurrentQuestion(prevInt => prevInt + 4);
    };

    const generateItems = () => {
        const currentPhrases = items.map(item => item[0]);
        const shuffledPhrases = [];
        for (let i = 0; i < currentPhrases.length; i += 4) {
            const chunk = currentPhrases.slice(i, i + 4);
            const shuffledChunk = chunk.sort(() => 0.5 - Math.random());
            shuffledPhrases.push(...shuffledChunk);
        }

        setShuffledPhrases(shuffledPhrases);

        const currentMeanings = items.map(item => item[1]);
        setCurrentMeanings(currentMeanings);
    };

    const startGame = async () => {
        setCurrentQuestion(0);
        setPairCount(0);
        setItems([]);
        setItemId([]);
        itemId.push(0);
        let gameState = await getGame(token);
        let i = 1;
        gameState.challenge.forEach((item) => {
            items.push([[item.content, i], [item.meaning, i]]);
            i += 1;
            itemId.push(item._id);
        })
        console.log(itemId[1]);
        // console.log(items);        
        setChoosenMeaningIds([]);
        setChoosenPhraseIds([]);
        setIsMeaningDisable(new Array(items.length).fill(false));
        setIsPhraseDisable(new Array(items.length).fill(false));
        setGameRunning(true);
        setCurrentMeanings([]);
        setShuffledPhrases([]);
        setGameTime(30);
        setIsCorrect(null);
        setSelectedMeaning(null);
        setSelectedPhrase(null);

        generateItems();
    }

    const handleBack = () => {
        navigate("/earn")
    }

    const handlePhraseClick = (phrase) => {
        if (selectedPhrase == phrase) {
            setSelectedPhrase(null);
        }
        else {
            setSelectedPhrase(phrase);
        }
    }

    const handleMeaningClick = (meaning) => {
        if (selectedMeaning == meaning) {
            setSelectedMeaning(null);
        }
        else {
            setSelectedMeaning(meaning);
        }
    }

    useEffect(() => {
        async function fetch() {
            if (gameRunning && gameTime > 0) {
                const timer = setTimeout(() => setGameTime(gameTime - 1), 1000);
                return () => clearTimeout(timer);
            } else if (gameTime == 0) {
                setGameRunning(false);
                let data = await answerSentenceGame(choosenPhraseIds, choosenMeaningIds, token);
                updateUserInfo(data.user);
                await openPopUp(false, "+"+ data.points, 2000)
                await wait(500)
                if (data.bonusTon) {
                    await openPopUp(true, "+" + data.bonusTon, 2000)
                }
            }
        }
        fetch()
    }, [gameTime, gameRunning]);

    useEffect(() => {
        if (selectedPhrase && selectedMeaning) {
            setChoosenPhraseIds((prevItem) => [...prevItem, itemId[selectedPhrase].toString()]);
            setChoosenMeaningIds((prevItem) => [...prevItem, itemId[selectedMeaning].toString()]);
            setIsCorrect(selectedMeaning == selectedPhrase);
        }
      }, [selectedPhrase, selectedMeaning]);

    useEffect(() => {
        async function fetch() {
            if (isCorrect == true) {
                incrementPairCount();
                if (pairCount == 3) {
                    if (currentQuestion == 16) {
                        setGameRunning(false);
                        let data = await answerSentenceGame(choosenPhraseIds, choosenMeaningIds, token)
                        updateUserInfo(data.user)
                        setIsDefault(false)
                        await openPopUp(false, "+"+data.points, 2000)
                        await wait(500)
                        if (data.bonusTon) {
                            await openPopUp(true, "+"+data.bonusTon, 2000)
                        }
                    }
                    incrementCurrentQuestion();
                    setPairCount(0);
                }

                setTimeout(() => {
                    isPhraseDisable[selectedPhrase] = true;
                    isMeaningDisable[selectedMeaning] = true;
                    setSelectedPhrase(null);
                    setSelectedMeaning(null);
                    setIsCorrect(null);
                }
                ,500);
            }
            else if (isCorrect == false) {
                setTimeout(() => {
                    setSelectedPhrase(null);
                    setSelectedMeaning(null);
                    setIsCorrect(null);
                }, 500);
            }}
        fetch()
    }, [isCorrect])

    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen h-screen">
            <div className="bg-[#1e1e1e] overflow-y-hidden overflow-x-auto w-screen h-[90vh] relative">
                <div className="absolute top-[5vh] left-[5vw] font-baloo text-white text-3xl font-bold">Kanji Master</div>
                
                <div className="w-[100vw] h-[90vh] mx-auto"
                    style={{
                        backgroundImage: `url(${kanjimaster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>

                {gameRunning ? 
                    <>
                        <div className="font-baloo text-white text-2xl absolute top-[6vh] right-[5vw] font-semibold">Time left: {gameTime}s</div>

                        <div className="absolute font-adlam text-white top-[20vh] left-[10vw]">
                            <div>
                                <div className="absolute top-[0vh] grid grid-cols-2 gap-2">{shuffledPhrases.slice(currentQuestion, currentQuestion + 4).map((phrase, index) => (
                                    <button
                                        key={phrase[1]}
                                        className={`sentence-box w-[35vw] text-black font-adlam font-bold bg-[#d9d9d9] col-start-1 col-span-1 mb-4 overflow-hidden text-ellipsis ${selectedPhrase == phrase[1] ? 'border-4 border-blue-500' : ''} ${selectedPhrase == phrase[1] && isCorrect == false ? 'bg-red-500 text-white' : ''} ${selectedPhrase == phrase[1] && isCorrect ? 'bg-green-500 text-white' : ''} ${isPhraseDisable[phrase[1]] ? 'bg-transparent border-none' : ''}`}
                                        onClick={() => handlePhraseClick(phrase[1])}
                                        disabled={isPhraseDisable[phrase[1]] == true}> 
                                            {isPhraseDisable[phrase[1]] ? null : phrase[0]}
                                    </button>
                                ))}
                                </div>

                                <div className="absolute left-[42vw] grid grid-cols-2 gap-2">{currentMeanings.slice(currentQuestion, currentQuestion + 4).map((meaning, index) => (
                                    <button
                                        key={meaning[1]}
                                        className={`sentence-box w-[35vw] text-black font-adlam font-bold bg-[#d9d9d9] col-start-2 col-span-1 mb-4 overflow-hidden text-ellipsis  ${selectedMeaning == meaning[1] ? 'border-4 border-blue-500' : ''} ${selectedMeaning == meaning[1] && isCorrect == false ? 'bg-red-500 text-white' : ''} ${selectedMeaning == meaning[1] && isCorrect ? 'bg-green-500 text-white' : ''} ${isMeaningDisable[meaning[1]] ? 'bg-transparent border-none' : ''}`}
                                        onClick={() => handleMeaningClick(meaning[1])}
                                        disabled={isMeaningDisable[meaning[1]] == true}>
                                            {isMeaningDisable[meaning[1]] ? null : meaning[0]}
                                    </button>
                                ))}
                                </div>
                            </div>    
                                                       
                        </div>
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
                    </>
                }
            </div>
        </div>
    );
};

export default SentenceGame;
