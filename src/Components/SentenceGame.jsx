import React, { useEffect, useState } from 'react';
import { createSentenceGameStore } from '../api/sentenceGame.api';
import { createUserStore } from '../api/user.api';
import { createPortal } from 'react-dom'

const SentenceGame = () => {

    // const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    const [selectedMeaning, setSelectedMeaning] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [randomItems, setRandomItems] = useState([]);
    const [shuffledPhrases, setShuffledPhrases] = useState([]);
    const [currentMeanings, setCurrentMeanings] = useState([]);
    const [items, setItems] = useState([]);

    const token = createUserStore(state => state.token);
    const userInfo = createUserStore(state => state.userInfo);
    const updateUserInfo = createUserStore(state => state.updateUserInfo);
    const answerSentenceGame = createSentenceGameStore(state => state.answerSentenceGame);
    const getGame = createSentenceGameStore(state => state.getGame);
    const game = createSentenceGameStore(state => state.game);

    const startGame = async () => {
        let gameState = await getGame(token);
        console.log(gameState);
    }

    // Function to shuffle the array and pick 3 random elements
    const getRandomItems = (array, num) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    const handlePhraseClick = (phrase) => {
        setSelectedPhrase(phrase);
    }

    const handleMeaningClick = (meaning) => {
        setSelectedMeaning(meaning);
    }

    // Get 3 random items
    const generateRandomItems = () => {
        const randomItems = getRandomItems(items, 3);
        setRandomItems(randomItems);

        const currentPhrases = randomItems.map(item => item[0]);
        const shuffledPhrases = [...currentPhrases].sort(() => 0.5 - Math.random());
        setShuffledPhrases(shuffledPhrases);

        const currentMeanings = randomItems.map(item => item[1]);
        setCurrentMeanings(currentMeanings);
    };

    useEffect(() => {
        generateRandomItems();
    }, []);

    useEffect(() => {
        if (selectedPhrase && selectedMeaning) {
          setIsCorrect(selectedPhrase === selectedMeaning);
        }
      }, [selectedPhrase, selectedMeaning]);

    useEffect(() => {
        if (isCorrect == true) {
            setTimeout(() => {
                generateRandomItems();
                setSelectedPhrase(null);
                setSelectedMeaning(null);
                setIsCorrect(null);
            }, 500);
        }
        else if (isCorrect == false) {
            setTimeout(() => {
                setSelectedPhrase(null);
                setSelectedMeaning(null);
                setIsCorrect(null);
            }, 500);
        }
    }, [isCorrect])

    // useEffect(() => {
    //     const fetchGame = async () => {
    //         if (token) {
    //             await getGame(token);
    //         }
    //     };

    //     fetchGame();
    // }, []);

    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen h-screen">
            <div className="bg-[#1e1e1e] overflow-y-hidden overflow-x-auto w-screen h-[90vh] relative">
                <div className='relative font-adlam text-white text-2xl pt-[5vh] text-left pl-[10vw] pr-[10vw]'>
                    Choose the corresponding meaning of the given phrase

                    <button
                            className="px-4 py-2 text-3xl cursor-pointer bg-[#ffffff] text-black border-none rounded-[20px] absolute top-[30vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-baloo font-bold"
                            onClick={startGame}
                            disabled={userInfo?.tickets <= 0}
                        >
                            {userInfo?.tickets > 0 ? "Start Game" : "Out of ticket"}
                        </button>

                </div>

                <div className="flex justify-around mt-10">
                    <div className="flex flex-col">
                        <label className="text-white mb-2 font-baloo font-medium">Phrases</label>
                        {shuffledPhrases
                            .map((phrase, index) => (
                                <button
                                    key={index}
                                    className={`sentence-box font-adlam mb-2 bg-[#c3e2c2] ${selectedPhrase == phrase[1] ? 'border-4 border-blue-500' : ''} ${selectedPhrase == phrase[1] && isCorrect == false ? 'bg-red-500 text-white' : ''} ${selectedPhrase == phrase[1] && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                    onClick={() => handlePhraseClick(phrase[1])}>
                                    {phrase[0]}
                                </button>
                            ))}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white mb-2 font-baloo font-medium">Meanings</label>
                        {currentMeanings.map((item, index) => (
                            <button
                                key={index}
                                className={`sentence-box font-adlam mb-2 bg-[#c3e2c2] ${selectedMeaning == item[1] ? 'border-4 border-blue-500' : ''} ${selectedMeaning == item[1] && isCorrect == false ? 'bg-red-500 text-white' : ''} ${selectedMeaning == item[1] && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                onClick={() => handleMeaningClick(item[1])}>
                                {item[0]}
                            </button>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default SentenceGame;
