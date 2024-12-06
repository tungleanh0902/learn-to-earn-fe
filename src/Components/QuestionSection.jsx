import React, { useState, useEffect } from 'react';
import { createQuizzStore } from "../api/quizz.api";
import { createUserStore } from "../api/user.api";
import { createSocialTaskStore } from "../api/socialTask.api";
import { useNavigate } from 'react-router-dom';
import PointsPopUp from './Popups/PointsPopUp';
import PopupMazii from './Popups/PopupMazii';
import { DonutChart } from "./DonutChart";
import star from "../assets/star.png" 

const QuestionSection = ({ isCampaign, handleClickActive }) => {
    const navigate = useNavigate();

    const lesson = createQuizzStore(state => state.lesson)
    const lessonForCampaign = createQuizzStore(state => state.lessonForCampaign)

    const token = createUserStore(state => state.token)
    const userInfo = createUserStore(state => state.userInfo)
    const updateUserInfo = createUserStore(state => state.updateUserInfo)
    const answerQuizz = createQuizzStore(state => state.answerQuizz)
    const doIncreaseIndex = createQuizzStore(state => state.doIncreaseIndex)
    const questionIdx = createQuizzStore(state => state.questionIdx)
    const wrongStreak = createQuizzStore(state => state.wrongStreak)
    const doIncreaseWrongStreak = createQuizzStore(state => state.doIncreaseWrongStreak)
    const answerSpecialQuizz = createQuizzStore(state => state.answerSpecialQuizz)
    const answerQuizzCampaign = createQuizzStore(state => state.answerQuizzCampaign)
    const doSummaryQuizzDaily = createQuizzStore(state => state.doSummaryQuizzDaily)
    const activeTask = createSocialTaskStore(state => state.activeTasks)

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [highlightedAnswer, setHighlightedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [outOfQuestion, setOutOfQuestion] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [newPoint, setNewPoint] = useState(0);
    const [wrongActive, setWrongActive] = useState(false);
    const [prevAnswer, setPrevAnswer] = useState(true);
    const [activePopUp, setActivePopUp] = useState(false);
    const [summary, setSummary] = useState({}); 

    if (activeTask.length == 0) {
        handleClickActive(0)
        navigate("/");
    }
    useEffect(() => {
        async function fetch() {
            if (isCampaign) {
                if (!lessonForCampaign || lessonForCampaign?.questions?.length == 0) {
                    await fetchSummary()
                    setOutOfQuestion(true)
                    setCurrentQuestion(null)
                } else {
                    setCurrentQuestion(lessonForCampaign?.questions[questionIdx])
                }
            } else {
                if (!lesson || lesson?.questions?.length == 0) {
                    await fetchSummary()
                    setOutOfQuestion(true)
                    setCurrentQuestion(null)
                } else {
                    setCurrentQuestion(lesson?.questions[questionIdx])
                }
            }
        }

        fetch()
    }, []);

    const handleAnswerClick = (answerId) => {
        setHighlightedAnswer(answerId);
    };
    console.log(outOfQuestion);
    
    const handleClose = () => {
        setActivePopUp(false)
        doIncreaseWrongStreak(0)
        setPrevAnswer(true)
    }

    const handleConfirmClick = async () => {
        console.log("handleConfirmClick");
        if (highlightedAnswer == null) {
            return
        }
        setSelectedAnswer(highlightedAnswer);
        let isCorrect = false;
        for (let index = 0; index < currentQuestion.options.length; index++) {
            const option = currentQuestion.options[index];
            if (option._id == highlightedAnswer && option?.isCorrect == true) {
                isCorrect = true;
                setIsCorrect(true);
                doIncreaseWrongStreak(0)
                setPrevAnswer(true)
                console.log(wrongStreak);
            }
        }
        if (isCorrect == false) {
            setWrongActive(true);
            setPrevAnswer(false)
            if (prevAnswer == false) {
                doIncreaseWrongStreak(wrongStreak + 1)
            }
        }
        let newUser
        let points = 0
        if (isCampaign) {
            let data = await answerQuizzCampaign(highlightedAnswer, token)
            newUser = data.user
            points = data.points
        } else {
            if (userInfo.moreQuizz > 0) {
                let data = await answerSpecialQuizz(highlightedAnswer, token)
                newUser = data.user
                points = data.points
            } else {
                let data = await answerQuizz(highlightedAnswer, token)
                newUser = data.user
                points = data.points
            }
        }
        setNewPoint(points)
        setIsActive(true)
        await updateUserInfo(newUser)

        setTimeout(async () => {
            let nextIdx = questionIdx + 1
            if (isCampaign) {
                if (questionIdx == lessonForCampaign.questions.length - 1) {
                    await fetchSummary()
                    setOutOfQuestion(true)
                    setCurrentQuestion(null)
                } else {
                    doIncreaseIndex(nextIdx)
                    setCurrentQuestion(lessonForCampaign.questions[nextIdx]);
                }
            } else {
                if (questionIdx == lesson.questions.length - 1) {
                    await fetchSummary()
                    setOutOfQuestion(true)
                    setCurrentQuestion(null)
                } else {
                    doIncreaseIndex(nextIdx)
                    setCurrentQuestion(lesson.questions[nextIdx]);
                }
            }
            setSelectedAnswer(null);
            setHighlightedAnswer(null);
            setIsCorrect(null);
            setWrongActive(false)
            setIsActive(false)
            setNewPoint(0)
        }, 2000); // 0.5 seconds delay
        console.log(wrongStreak);

        if (wrongStreak == 5) {
            setActivePopUp(true)
        }
    };

    const fetchSummary = async () => {
        let data = await doSummaryQuizzDaily(token)
        let summaryArray = []
        summaryArray.push({ value: data.correctAnswers }) 
        summaryArray.push({ value: data.falseAnswers }) 
        setSummary(summaryArray)
    }

    const handleGoHome = () => {
        handleClickActive(0)
        navigate("/");
    }

    const handleGoShop = () => {
        handleClickActive(4)
        navigate("/shop");
    }

    return (
        <div className="overflow-hidden">
            <div className="items-center flex-col">
                {
                    isActive && newPoint != 0 ?
                        <PointsPopUp className="flex-none"
                            points={newPoint}
                            isActive={isActive}
                            isTon={false}
                        />
                        :
                        <></>
                }
                {
                    activePopUp ?
                        <PopupMazii className="flex-none"
                            handleClose={handleClose}
                        />
                        :
                        <></>
                }
                {outOfQuestion == true ?
                    <div className="absolute fixed m-auto left-0 right-0 p-4 w-[350px] max-h-full z-50 top-20">
                        <div className="relative rounded-lg shadow bg-black">
                            <div className="items-center justify-between p-4 text-white">
                                <h3 class="text-base text-4xl leading-relaxed text-white">
                                    Congratulations!!!
                                </h3>
                                <p className='text-white'>🚀</p>
                                <div className="absolute top-[-40px] ml-[-205px]">
                                    <DonutChart data={summary} width={700} height={400} />
                                </div>
                                <div className='mt-[60px] mb-[80px]'>
                                    <div>
                                        <span className='text-4xl'>{summary[0].value}</span><span className='text-sm'>/ {summary[0].value + summary[1].value}</span>
                                    </div>
                                    <p className='text-sm'>Quizz played</p>
                                </div>
                                <div className='flex text-left'>
                                    <div className='bg-[#BB2B17] w-[140px] p-[15px] rounded-xl mr-[20px]'>
                                        <p className='text-xl mb-[5px]'>{summary[1].value}</p>
                                        <p className='text-xs'>Wrong</p>
                                    </div>
                                    <div className='bg-[#209F66] relative w-[140px] p-[15px] rounded-xl'>
                                        <p className='text-xl mb-[5px]'>{summary[0].value}</p>
                                        <p className='text-xs'>Quizz won</p>
                                        <img className='absolute top-3 right-5' src={star} alt="" />
                                    </div>
                                </div>
                                <p className='text-[#707579] text-bold mt-[10px] mb-[5px]'>Out of questions</p>
                                <button
                                    onClick={handleGoShop}
                                    className="bottom-[3vh] py-[1vh] rounded-[15px] w-[60vw] left-[10vw] text-black font-adlam-display text-xl bg-white">
                                        Buy more quizzes
                                </button>
                                <button onClick={handleGoHome} className='text-[#707579]'>Go back home</button>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <p className="font-nunito-bold text-bold text-white text-[120%]">{currentQuestion?.content ?? "Question"}</p>
                        {/* <div className="text-white">{newPoint}</div> */}
                        <div className="relative pt-[3vh] grid grid-cols-2 gap-2 px-[12%] font-bold font-nunito-bold">
                            <div
                                className={`answer-box bg-[#c3e2c2] ${wrongActive && currentQuestion?.options[0]?.isCorrect == true ? 'bg-green-500 text-white' : ''} ${highlightedAnswer == currentQuestion?.options[0]._id ? 'border-4 border-blue-500' : ''} ${selectedAnswer == currentQuestion?.options[0]._id && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer == currentQuestion?.options[0]._id && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                onClick={() => handleAnswerClick(currentQuestion?.options[0]._id)}
                            >
                                {currentQuestion?.options[0].content}
                            </div>
                            <div
                                className={`answer-box bg-[#e4efc4] ${wrongActive && currentQuestion?.options[1]?.isCorrect == true ? 'bg-green-500 text-white' : ''} ${highlightedAnswer == currentQuestion?.options[1]._id ? 'border-4 border-blue-500' : ''} ${selectedAnswer == currentQuestion?.options[1]._id && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer == currentQuestion?.options[1]._id && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                onClick={() => handleAnswerClick(currentQuestion?.options[1]._id)}
                            >
                                {currentQuestion?.options[1].content}
                            </div>
                            <div
                                className={`answer-box bg-[#FEEE91] ${wrongActive && currentQuestion?.options[2]?.isCorrect == true ? 'bg-green-500 text-white' : ''} ${highlightedAnswer == currentQuestion?.options[2]._id ? 'border-4 border-blue-500' : ''} ${selectedAnswer == currentQuestion?.options[2]._id && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer == currentQuestion?.options[2]._id && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                onClick={() => handleAnswerClick(currentQuestion?.options[2]._id)}
                            >
                                {currentQuestion?.options[2].content}
                            </div>
                            <div
                                className={`answer-box bg-[#CD8D7A] ${wrongActive && currentQuestion?.options[3]?.isCorrect == true ? 'bg-green-500 text-white' : ''} ${highlightedAnswer == currentQuestion?.options[3]._id ? 'border-4 border-blue-500' : ''} ${selectedAnswer == currentQuestion?.options[3]._id && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer == currentQuestion?.options[3]._id && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                onClick={() => handleAnswerClick(currentQuestion?.options[3]._id)}
                            >
                                {currentQuestion?.options[3].content}
                            </div>
                        </div>

                        {/* {highlightedAnswer && !selectedAnswer && ( */}
                        <div className={`relative py-[0.5vh] flex-none rounded-[15px] w-[75%] mx-[12.5%] mt-[5%] ${selectedAnswer ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-white'}`}>
                            <button
                                disabled={activePopUp}
                                className={`relative font-adlam-display font-bold text-[150%] my-[2%] cursor-pointer ${selectedAnswer ? 'text-white' : 'text-black'}`}
                                onClick={selectedAnswer ? null : handleConfirmClick}
                            >
                                {selectedAnswer ? (isCorrect ? 'Correct!' : 'Incorrect!') : 'Confirm'}
                            </button>
                        </div>
                        {/* )}} */}
                    </>
                }
            </div>
        </div>
    );
};

export default QuestionSection;