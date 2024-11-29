import React, { useState, useEffect } from 'react';
import { createQuizzStore } from "../api/quizz.api";
import { createUserStore } from "../api/user.api";
import { createSocialTaskStore } from "../api/socialTask.api";
import { useNavigate } from 'react-router-dom';
import PointsPopUp from './PointsPopUp';

const QuestionSection = ({isCampaign, handleClickActive}) => {
    const navigate = useNavigate();

    const lesson = createQuizzStore(state => state.lesson)
    const lessonForCampaign = createQuizzStore(state => state.lessonForCampaign)

    const token = createUserStore(state => state.token)
    const userInfo = createUserStore(state => state.userInfo)
    const updateUserInfo = createUserStore(state => state.updateUserInfo)
    const answerQuizz = createQuizzStore(state => state.answerQuizz)
    const doIncreaseIndex = createQuizzStore(state => state.doIncreaseIndex)
    const questionIdx = createQuizzStore(state => state.questionIdx)
    const answerSpecialQuizz = createQuizzStore(state => state.answerSpecialQuizz)
    const answerQuizzCampaign = createQuizzStore(state => state.answerQuizzCampaign)
    const activeTask = createSocialTaskStore(state => state.activeTasks)

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [highlightedAnswer, setHighlightedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [outOfQuestion, setOutOfQuestion] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [newPoint, setNewPoint] = useState(0);

    if (activeTask.length == 0) {
        handleClickActive(0)
        navigate("/");
    }
    useEffect(() => {
        if (isCampaign) {
            if (lessonForCampaign.length == 0 || !lessonForCampaign || lessonForCampaign?.questions?.length == 0) {
                setOutOfQuestion(true)
            } else {
                setCurrentQuestion(lessonForCampaign?.questions[questionIdx])
            }
        } else {
            if (lesson.length == 0 || !lesson || lesson?.questions?.length == 0) {
                setOutOfQuestion(true)
            } else {
                setCurrentQuestion(lesson?.questions[questionIdx])
            }
        }
    }, []);

    const handleAnswerClick = (answerId) => {
        setHighlightedAnswer(answerId);
    };

    const handleConfirmClick = async () => {
        if (highlightedAnswer == null) {
            return
        }
        setSelectedAnswer(highlightedAnswer);
        for (let index = 0; index < currentQuestion.options.length; index++) {
            const option = currentQuestion.options[index];
            if (option._id == highlightedAnswer && option?.isCorrect == true) {
                setIsCorrect(true);
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

        setTimeout(() => {
            let nextIdx = questionIdx + 1
            if (isCampaign) {
                if (questionIdx == lessonForCampaign.questions.length - 1) {
                    setOutOfQuestion(true)
                } else {
                    doIncreaseIndex(nextIdx)
                    setCurrentQuestion(lessonForCampaign.questions[nextIdx]);
                }
            } else {
                if (questionIdx == lesson.questions.length - 1) {
                    setOutOfQuestion(true)
                } else {
                    doIncreaseIndex(nextIdx)
                    setCurrentQuestion(lesson.questions[nextIdx]);
                }
            }
            setSelectedAnswer(null);
            setHighlightedAnswer(null);
            setIsCorrect(null);

            setIsActive(false)
            setNewPoint(0)
        }, 2000); // 0.5 seconds delay
    };

    return (
        <div className="overflow-hidden">
            <div className="items-center flex-col">
                {
                    isActive && newPoint!=0 ?
                        <PointsPopUp className="flex-none"
                            points={newPoint}
                            isActive={isActive}
                            isTon={false}
                        />
                        :
                        <></>
                }
                    {outOfQuestion == true ?
                        <p className="font-nunito-bold text-bold text-white text-[120%]">Out of daily quizz</p>
                        :
                        <>
                            <p className="font-nunito-bold text-bold text-white text-[120%]">{currentQuestion?.content ?? "Question"}</p>
                            {/* <div className="text-white">{newPoint}</div> */}
                            <div className="relative pt-[3vh] grid grid-cols-2 gap-2 px-[12%] font-bold font-nunito-bold">
                                <div
                                    className={`answer-box bg-[#c3e2c2] ${highlightedAnswer == currentQuestion?.options[0]._id ? 'border-4 border-blue-500' : ''} ${selectedAnswer == currentQuestion?.options[0]._id && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer == currentQuestion?.options[0]._id && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                    onClick={() => handleAnswerClick(currentQuestion?.options[0]._id)}
                                >
                                    {currentQuestion?.options[0].content}
                                </div>
                                <div
                                    className={`answer-box bg-[#e4efc4] ${highlightedAnswer == currentQuestion?.options[1]._id ? 'border-4 border-blue-500' : ''} ${selectedAnswer == currentQuestion?.options[1]._id && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer == currentQuestion?.options[1]._id && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                    onClick={() => handleAnswerClick(currentQuestion?.options[1]._id)}
                                >
                                    {currentQuestion?.options[1].content}
                                </div>
                                <div
                                    className={`answer-box bg-[#FEEE91] ${highlightedAnswer == currentQuestion?.options[2]._id ? 'border-4 border-blue-500' : ''} ${selectedAnswer == currentQuestion?.options[2]._id && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer == currentQuestion?.options[2]._id && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                    onClick={() => handleAnswerClick(currentQuestion?.options[2]._id)}
                                >
                                    {currentQuestion?.options[2].content}
                                </div>
                                <div
                                    className={`answer-box bg-[#CD8D7A] ${highlightedAnswer == currentQuestion?.options[3]._id ? 'border-4 border-blue-500' : ''} ${selectedAnswer == currentQuestion?.options[3]._id && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer == currentQuestion?.options[3]._id && isCorrect ? 'bg-green-500 text-white' : ''}`}
                                    onClick={() => handleAnswerClick(currentQuestion?.options[3]._id)}
                                >
                                    {currentQuestion?.options[3].content}
                                </div>
                            </div>

                            {/* {highlightedAnswer && !selectedAnswer && ( */}
                            <div className={`relative py-[0.5vh] flex-none rounded-[15px] w-[75%] mx-[12.5%] mt-[5%] ${selectedAnswer ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-white'}`}>
                                <div
                                    className={`relative font-adlam-display font-bold text-[150%] my-[2%] cursor-pointer ${selectedAnswer ? 'text-white' : 'text-black'}`}
                                    onClick={selectedAnswer ? null : handleConfirmClick}
                                >
                                    {selectedAnswer ? (isCorrect ? 'Correct!' : 'Incorrect!') : 'Confirm'}
                                </div>
                            </div>
                            {/* )}} */}
                        </>
                }
            </div>
        </div>
    );
};

export default QuestionSection;