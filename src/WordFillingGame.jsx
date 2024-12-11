import React, { useState } from 'react';
import { createWordFillingGameStore } from './api/wordFillingGame.api';
import { createUserStore } from './api/user.api';
import { useNavigate } from 'react-router-dom';
import { wait } from './api/helper';
import speaker from './assets/Speaker.svg';
import PointsPopUp from './Components/Popups/PointsPopUp';
import { useEffect } from 'react';

const WordFillingGame = () => {
    const navigate = useNavigate();

    const token = createUserStore(state => state.token);
    const userInfo = createUserStore(state => state.userInfo);
    const updateUserInfo = createUserStore(state => state.updateUserInfo);
    const getGame = createWordFillingGameStore(state => state.getGame);
    const answerWordFillingGame = createWordFillingGameStore(state => state.answerWordFillingGame);

    const [gameRunning, setGameRunning] = useState(false);
    const [meanings, setMeanings] = useState([]);
    const [ids, setIds] = useState([]); 
    const [isActive, setIsActive] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isTon, setIsTon] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [combinedAnswers, setCombinedAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [gameTime, setGameTime] = useState(30);

    const hiragana = [
        'あ', 'い', 'う', 'え', 'お',
        'か', 'き', 'く', 'け', 'こ',
        'さ', 'し', 'す', 'せ', 'そ',
        'た', 'ち', 'つ', 'て', 'と',
        'な', 'に', 'ぬ', 'ね', 'の',
        'は', 'ひ', 'ふ', 'へ', 'ほ',
        'ま', 'み', 'む', 'め', 'も',
        'や', 'ゆ', 'よ',
        'ら', 'り', 'る', 'れ', 'ろ',
        'わ', 'を', 'ん',
        'が', 'ぎ', 'ぐ', 'げ', 'ご',
        'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
        'だ', 'ぢ', 'づ', 'で', 'ど',
        'ば', 'び', 'ぶ', 'べ', 'ぼ',
        'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'
    ];
      
    const katakana = [
        'ア', 'イ', 'ウ', 'エ', 'オ',
        'カ', 'キ', 'ク', 'ケ', 'コ',
        'サ', 'シ', 'ス', 'セ', 'ソ',
        'タ', 'チ', 'ツ', 'テ', 'ト',
        'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
        'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
        'マ', 'ミ', 'ム', 'メ', 'モ',
        'ヤ', 'ユ', 'ヨ',
        'ラ', 'リ', 'ル', 'レ', 'ロ',
        'ワ', 'ヲ', 'ン',
        'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
        'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
        'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
        'バ', 'ビ', 'ブ', 'ベ', 'ボ',
        'パ', 'ピ', 'プ', 'ペ', 'ポ'
    ];

    const japaneseAlphabet = [
        ...hiragana,
        ...katakana
    ];
      
    //   console.log(japaneseAlphabet);

    let gameState = null;
    const startGame = async () => {       
        gameState = await getGame(token);
        setCurrentQuestionIndex(0);
        setIsCorrect(null);
        generateQuestions(gameState.challenge);
        setGameRunning(true);
        setSelectedAnswer([]);
        setGameTime(30);
    }

    const generateQuestions = (challenges) => {
        const questionContents = challenges.map(challenge => {
            const index = Math.floor(Math.random() * challenge.content.length);
            const modifiedContent = challenge.content.substring(0, index) + '_' + challenge.content.substring(index + 1);
            return {
                modifiedContent,
                answer: challenge.content[index]
            };
        });

        const questionTexts = questionContents.map(q => q.modifiedContent);
        const answers = questionContents.map(q => q.answer);
        const meanings = challenges.map(challenge => challenge.meaning);
        const ids = challenges.map(challenge => challenge.id);

        setIds(ids);
        setQuestions(questionTexts);
        setAnswers(answers);
        setMeanings(meanings);

        generateCombinedAnswers(answers);
    };

    const generateCombinedAnswers = (answers) => {
        const combinedAnswersArray = answers.map(answer => {
            const filteredAlphabet = japaneseAlphabet.filter(char => char !== answer);
            const shuffledAlphabet = filteredAlphabet.sort(() => 0.5 - Math.random());
            const randomItems = shuffledAlphabet.slice(0, 5);
            const combined = [answer, ...randomItems].sort(() => 0.5 - Math.random());
            return combined;
        });
        setCombinedAnswers(combinedAnswersArray);
    }

    const incrementCurrentQuestionIndex = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    useEffect(() => {
        async function fetch() {
            if (gameRunning && gameTime > 0) {
                const timer = setTimeout(() => setGameTime(gameTime - 1), 1000);
                return () => clearTimeout(timer);
            } else if (gameTime == 0) {
                setGameRunning(false);
                console.log(selectedAnswer);
                let data = await answerWordFillingGame({answers: selectedAnswers}, token);
                updateUserInfo(data.user);
                console.log(data);
                await openPopUp(false, "+"+ data.points, 2000)
                await wait(500)
                if (data.bonusTon) {
                    await openPopUp(true, "+" + data.bonusTon, 2000)
                }
            }
        }
        fetch()
    }, [gameTime, gameRunning]);

    async function openPopUp(isTon, points, timeout) {
        setIsTon(isTon)
        setNewPoint(points)
        setIsActive(true)
        await wait(timeout)
        setIsActive(false)
        setNewPoint("0")
        setIsTon(false)
    }

    useEffect(() => {
        async function fetch() {
            if (isCorrect != null) {
                setTimeout(() => {
                    incrementCurrentQuestionIndex();
                    if (currentQuestionIndex === questions.length - 1) {
                        setGameRunning(false);
                        // updateUserInfo({
                        //     tickets: userInfo.tickets - 1
                        // });
                        return;
                    }
                    setIsCorrect(null);
                    setSelectedAnswer(null);
                    // setQuestion(questions[currentQuestionIndex].content);
                }, 500)
            }
        }
        fetch()
    }, [isCorrect])

    const handleAnswerQuestion = (answer, correctAnswer, currentId) => {
        setSelectedAnswer(answer);
        setIsCorrect(answer === correctAnswer);
        if (isCorrect == true) {
            selectedAnswers.push(currentId);
        }
        else if (isCorrect == false) {
            selectedAnswers.push(null);
        }
    }

    const handleBack = () => {
        navigate("/earn")
    }
    

    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen h-screen">
            <div className="bg-[#1e1e1e] overflow-y-hidden overflow-x-auto w-screen h-[90vh] relative">
                <div className="absolute top-[5vh] left-[5vw] font-baloo font-bold text-white text-3xl">
                    Word Filling
                </div>  

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

                        {/* <img
                            src={speaker}
                            alt="Speaker"
                            className="absolute top-[15vh] left-[8vw]"
                        ></img> */}

                        <div className="relative pt-[15vh] text-[#385aca] font-nunito-bold font-bold text-4xl">{questions[currentQuestionIndex]}</div>
                        {/* <div className="relative pt-[15vh] text-[#385aca] font-nunito-bold font-bold text-4xl">{combinedAnswers}</div> */}
                        <div className="relative font-nunito-bold text-xl text-white pt-[2vh]">meaning: {meanings[currentQuestionIndex]}</div>

                        <div className="relative pt-[5vh]">
                            <div className="relative grid grid-cols-2 ml-[10vw] m-auto">{combinedAnswers[currentQuestionIndex].map((answer, index) => (
                                <button
                                    key={index}
                                    className={`wordfill-box col-span-1 text-black font-nunito-bold font-medium text-2xl bg-[#d9d9d9] w-[35vw] mb-4 ${answers[currentQuestionIndex] === answer  && isCorrect != null ? 'bg-green-500' : ''} ${selectedAnswer === answer && isCorrect == false ? 'bg-red-500' : ''}`}
                                    onClick={() => {handleAnswerQuestion(answer, answers[currentQuestionIndex], ids[currentQuestionIndex])}}
                                >
                                    {answer}
                                </button>
                            ))}
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

            </div>
            
            {/* <button onClick={startGame}>Start Game</button> */}
        </div>
    );
};

export default WordFillingGame;