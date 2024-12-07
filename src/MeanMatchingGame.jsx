import React, { useEffect, useState } from 'react';
import { createMeanMatchingGameStore } from './api/meanMatchingGame.api';
import { createUserStore } from './api/user.api';
import kanjimaster from './assets/kanji_master.svg';
import { useNavigate } from 'react-router-dom';
import PointsPopUp from './Components/Popups/PointsPopUp';
import { wait } from './api/helper';

const MeanMatchingGame = () => {
    const navigate = useNavigate();

    // const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    const [selectedMeaning, setSelectedMeaning] = useState(null);
    const [selectedPhraseId, setSelectedPhraseId] = useState(null);
    const [selectedMeaningId, setSelectedMeaningId] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledPhrases, setShuffledPhrases] = useState([]);
    const [currentMeanings, setCurrentMeanings] = useState([]);
    const [items, setItems] = useState([]);
    const [gameRunning, setGameRunning] = useState(false);
    const [gameTime, setGameTime] = useState(30);
    const [isMeaningDisable, setIsMeaningDisable] = useState([]);
    const [isPhraseDisable, setIsPhraseDisable] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [pairCount, setPairCount] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [newPoint, setNewPoint] = useState("0");
    const [isTon, setIsTon] = useState(false);
    const [isDefault, setIsDefault] = useState(true)
    const [popUpVisible, setPopupVisible] = useState(true);
    const [isClickable, setIsClickable] = useState([]);

    const token = createUserStore(state => state.token);
    const userInfo = createUserStore(state => state.userInfo);
    const updateUserInfo = createUserStore(state => state.updateUserInfo);
    const getGame = createMeanMatchingGameStore(state => state.getGame);
    const answerMeanMatchingGame = createMeanMatchingGameStore(state => state.answerMeanMatchingGame);

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
        // let tmpItems = []
        let gameState = await getGame(token);
        let i = 1;
        gameState.challenge.forEach((item) => {
            items.push([[item.content, i], [item.meaning, i]]);
            // tmpItems.push([[item.content, i], [item.meaning, i]]);
            i += 1;
        })
        // setItems(tmpItems)
        setIsMeaningDisable(new Array(items.length).fill(false));
        setIsPhraseDisable(new Array(items.length).fill(false));
        setIsClickable(new Array(items.length).fill(true));
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

    async function openPopUp(isTon, points, timeout) {
        setIsTon(isTon)
        setNewPoint(points)
        setIsActive(true)
        await wait(timeout)
        setIsActive(false)
        setNewPoint("0")
        setIsTon(false)
    }

    const handlePhraseClick = (phrase, id) => {
        if (selectedPhrase == phrase) {
            setSelectedPhrase(null);
            setSelectedPhraseId(null)
        }
        else {
            setSelectedPhraseId(id)
            setSelectedPhrase(phrase);
        }
    }

    const handleMeaningClick = (meaning, id) => {
        if (selectedMeaning == meaning) {
            setSelectedMeaning(null);
            setSelectedMeaningId(null)
        }
        else {
            setSelectedMeaningId(id)
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
                console.log(selectedAnswer);
                let data = await answerMeanMatchingGame({answers: selectedAnswer}, token);
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
            console.log(selectedMeaning);
            console.log(selectedPhrase);
            setSelectedAnswer((prevItem) => [...prevItem, {
                content: selectedPhrase,
                meaning: selectedMeaning
            }])
            setIsCorrect(selectedMeaningId == selectedPhraseId);
        }
      }, [selectedPhrase, selectedMeaning]);

    useEffect(() => {
        async function fetch() {
            if (isCorrect == true) {
                setIsClickable[selectedPhrase] = false;
                setIsClickable[selectedMeaning] = false;
                incrementPairCount();
                if (pairCount == 3) {
                    if (currentQuestion == 16) {
                        setGameRunning(false);
                        // let data = await answerSentenceGame(choosenPhraseIds, choosenMeaningIds, token)
                        // updateUserInfo(data.user)
                        // setIsDefault(false)
                        // await openPopUp(false, "+"+data.points, 2000)
                        // await wait(500)
                        // if (data.bonusTon) {
                        //     await openPopUp(true, "+"+data.bonusTon, 2000)
                        // }
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
                        <div className="font-baloo text-white text-2xl absolute top-[6vh] right-[5vw] font-semibold">Time left: {gameTime}s</div>

                        <div className="absolute font-adlam text-white top-[20vh] left-[10vw]">
                            <div>
                                <div className="absolute top-[0vh] grid grid-cols-2 gap-2">{shuffledPhrases.slice(currentQuestion, currentQuestion + 4).map((phrase, index) => (
                                    <button
                                        key={phrase[1]}
                                        className={`sentence-box w-[35vw] text-black font-adlam font-bold bg-[#d9d9d9] col-start-1 col-span-1 mb-4 overflow-hidden text-ellipsis ${selectedPhrase == phrase[0] ? 'border-4 border-blue-500' : ''} ${selectedPhrase == phrase[0] && isCorrect == false ? 'bg-red-500 text-white' : ''} ${selectedPhrase == phrase[0] && isCorrect ? 'bg-green-500 text-white' : ''} ${isPhraseDisable[phrase[0]] ? 'invisible' : ''}`}
                                        onClick={() => handlePhraseClick(phrase[0], phrase[1])}
                                        disabled={isClickable[phrase[0]] == false}> 
                                            {isPhraseDisable[phrase[1]] ? null : phrase[0]}
                                    </button>
                                ))}
                                </div>

                                <div className="absolute left-[42vw] grid grid-cols-2 gap-2">{currentMeanings.slice(currentQuestion, currentQuestion + 4).map((meaning, index) => (
                                    <button
                                        key={meaning[1]}
                                        className={`sentence-box w-[35vw] text-black font-adlam font-bold bg-[#d9d9d9] col-start-2 col-span-1 mb-4 overflow-hidden text-ellipsis  ${selectedMeaning == meaning[0] ? 'border-4 border-blue-500' : ''} ${selectedMeaning == meaning[0] && isCorrect == false ? 'bg-red-500 text-white' : ''} ${selectedMeaning == meaning[0] && isCorrect ? 'bg-green-500 text-white' : ''} ${isMeaningDisable[meaning[0]] ? 'invisible' : ''}`}
                                        onClick={() => handleMeaningClick(meaning[0], meaning[1])}
                                        disabled={isClickable[meaning[0]] == false}>
                                            {isMeaningDisable[meaning[1]] ? null : meaning[0]}
                                    </button>
                                ))}
                                </div>
                            </div>    
                                                       
                        </div>
                    </> 
                    : 
                    <>
                        <p
                            className="px-4 py-2 text-xl cursor-pointer text-white border-none rounded-[20px] absolute top-[22vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-baloo font-bold"
                        >
                            Tickets: {userInfo?.tickets ?? 0}
                        </p>
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
                {popUpVisible && (
                    <div 
                    className=" inset-0 flex items-center justify-center fixed"
                    onClick={() => setPopupVisible(false)}>
                        <div className="bg-[#0088cc] w-[80vw] h-[70vh] rounded-[20px] relative ">
                            <div className="pt-[3vh] relative"></div>
                            <div className="font-adlam text-white font-medium text-4xl relative">Mean matching</div>
                            <div className="pt-[2vh] relative"></div>
                            <div className="font-baloo text-white font-bold text-xl">How to play?</div>

                            <div className="label">
                                <p className ="text-white text-left pl-[10vw] pr-[5vw] text-sm font-afacad-variable">
                                    <div className="list-item">Players will be given 20 Japanese words.</div>
                                    <div className="list-item">Your task is to connect them based on their meanings.</div>
                                    <div className="list-item">If you can't find a suitable word within the given time or pick an invalid word, you lose points or time.</div>
                                    <div className="list-item">Try to connect as many words as possible to score over 200 points and have a chance to earn TON.</div>
                                </p>
                            </div>

                            <div className="absolute bottom-[5vh] left-[10vw] right-[10vw] items-center">
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

export default MeanMatchingGame;
