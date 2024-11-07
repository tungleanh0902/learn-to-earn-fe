import React, { useState, useEffect } from 'react';
import { createQuizzStore } from "../api/quizz.api";
import { createUserStore } from "../api/user.api";

const QuestionSection = ({isCampaign}) => {
    const lesson = createQuizzStore(state => state.lesson)
    const lessonForCampaign = createQuizzStore(state => state.lessonForCampaign)

    const token = createUserStore(state => state.token)
    const updateUserInfo = createUserStore(state => state.updateUserInfo)
    const answerQuizz = createQuizzStore(state => state.answerQuizz)
    const answerQuizzCampaign = createQuizzStore(state => state.answerQuizzCampaign)

    const [questionIdx, setquestionIdx] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [highlightedAnswer, setHighlightedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [outOfQuestion, setOutOfQuestion] = useState(false);
   
    useEffect(() => {
        if (isCampaign) {
            if (lessonForCampaign.length == 0 || !lessonForCampaign || lessonForCampaign?.questions?.length == 0) {
                setOutOfQuestion(true)
            } else {
                setCurrentQuestion(lessonForCampaign?.questions[0])
            }
        } else {
            if (lesson.length == 0 || !lesson || lesson?.questions?.length == 0) {
                setOutOfQuestion(true)
            } else {
                setCurrentQuestion(lesson?.questions[0])
            }
        }
    }, []);

    const handleAnswerClick = (answerId) => {
        setHighlightedAnswer(answerId);
    };

    const handleConfirmClick = async () => {
        setSelectedAnswer(highlightedAnswer);
        for (let index = 0; index < currentQuestion.options.length; index++) {
            const option = currentQuestion.options[index];
            if (option._id == highlightedAnswer && option?.isCorrect == true) {
                setIsCorrect(true);
            }
        }
        let newUser
        if (isCampaign) {
            newUser = await answerQuizzCampaign(highlightedAnswer, token)
        } else {
            newUser = await answerQuizz(highlightedAnswer, token)
        }
        updateUserInfo(newUser)

        setTimeout(() => {
            if (isCampaign) {
                if (questionIdx == lessonForCampaign.questions.length - 1) {
                    setOutOfQuestion(true)
                } else {
                    setquestionIdx(questionIdx + 1)
                    setCurrentQuestion(lessonForCampaign.questions[questionIdx]);
                }
            } else {
                if (questionIdx == lesson.questions.length - 1) {
                    setOutOfQuestion(true)
                } else {
                    setquestionIdx(questionIdx + 1)
                    setCurrentQuestion(lesson.questions[questionIdx]);
                }
            }
            setSelectedAnswer(null);
            setHighlightedAnswer(null);
            setIsCorrect(null);
        }, 1500); // 1.5 seconds delay
    };

    return (
        <div className="overflow-hidden">
            <div className="items-center flex-col">
                {
                    outOfQuestion == true ?
                        <p className="mb-[8%] font-nunito-bold text-bold text-white text-[120%]">Out of daily quizz</p>
                        :
                        <>
                            <p className="mb-[8%] font-nunito-bold text-bold text-white text-[120%]">{currentQuestion?.content ?? "Question"}</p>

                            <div className="relative grid grid-cols-2 gap-2 px-[12%] font-bold font-nunito-bold">
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
                            <div className={`absolute flex-none rounded-[15px] w-[75%] mx-[12.5%] mt-[5%] ${selectedAnswer ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-white'}`}>
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