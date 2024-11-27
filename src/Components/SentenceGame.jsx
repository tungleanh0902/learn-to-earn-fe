import React, { useEffect, useState } from 'react';
import { createSentenceGameStore } from '../api/sentenceGame.api';
import { createUserStore } from '../api/user.api';

import { DndContext } from '@dnd-kit/core';
// import { SortableContext, arrayMove } from '@dnd-kit/sortable';
// import { SentencePart } from './SentencePart';
import { createPortal } from 'react-dom'
// import { SentenceRow } from './SentenceRow';

const SentenceGame = () => {
    const getGame = createSentenceGameStore(state => state.getGame);
    const game = createSentenceGameStore(state => state.game);
    const token = createUserStore(state => state.token);

    // const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    const [selectedMeaning, setSelectedMeaning] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [randomItems, setRandomItems] = useState([]);
    const [shuffledPhrases, setShuffledPhrases] = useState([]);
    const [currentMeanings, setCurrentMeanings] = useState([]);

    const items = [
        [['Phrase 1', '1'], ['Meaning 1', '1']],
        [['Phrase 2', '2'], ['Meaning 2', '2']],
        [['Phrase 3', '3'], ['Meaning 3', '3']],
        [['Phrase 4', '4'], ['Meaning 4', '4']],
        [['Phrase 5', '5'], ['Meaning 5', '5']],
        [['Phrase 6', '6'], ['Meaning 6', '6']],
    ];

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
