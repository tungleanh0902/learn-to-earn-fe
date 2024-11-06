import React, { useState, useEffect } from 'react';

const QuestionSection = () => {
    const Questions = [
        // { context: "What is \"Hello\"?", a: "こんにちは", b: "你好", c: "Bonjour", d: "Hola", answer: "a" },
        // { context: "What is \"Goodbye\"?", a: "さようなら", b: "再见", c: "Au revoir", d: "Adiós", answer: "a" },
        // { context: "What is \"Thank you\"?", a: "ありがとう", b: "谢谢", c: "Merci", d: "Gracias", answer: "a" },
        { context: "What does \"いくらですか?\" mean?", a: "How are you?", b: "How much is it?", c: "What is this?", d: "Where is it?", answer: "b" },
        { context: "What does \"お会計お願いします\" mean?", a: "Check, please", b: "Help, please", c: "Can I have a menu?", d: "Where is the restroom?", answer: "a" },
        { context: "How would you ask for a discount?", a: "いくらですか?", b: "安くなりませんか?", c: "おいしいですか?", d: "ありがとう", answer: "b" },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [highlightedAnswer, setHighlightedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        const getRandomQuestion = () => {
            const randomIndex = Math.floor(Math.random() * Questions.length);
            return Questions[randomIndex];
        };

        setCurrentQuestion(getRandomQuestion());
    }, []);

    const handleAnswerClick = (answer) => {
        setHighlightedAnswer(answer);
    };

    const handleConfirmClick = () => {
        setSelectedAnswer(highlightedAnswer);
        setIsCorrect(highlightedAnswer === currentQuestion.answer);

        setTimeout(() => {
            const getRandomQuestion = () => {
                const randomIndex = Math.floor(Math.random() * Questions.length);
                return Questions[randomIndex];
            };

            setCurrentQuestion(getRandomQuestion());
            setSelectedAnswer(null);
            setHighlightedAnswer(null);
            setIsCorrect(null);
        }, 2000); // 2 seconds delay
    };

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-hidden">
            <div className="items-center flex-col">
                <p className="mb-[8%] font-nunito-bold text-bold text-white text-[120%]">{currentQuestion.context}</p>

                <div className="relative grid grid-cols-2 gap-2 px-[12%] font-bold font-nunito-bold">
                    <div
                        className={`answer-box bg-[#c3e2c2] ${highlightedAnswer === 'a' ? 'border-4 border-blue-500' : ''} ${selectedAnswer === 'a' && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer === 'a' && isCorrect ? 'bg-green-500 text-white' : ''}`}
                        onClick={() => handleAnswerClick('a')}
                    >
                        {currentQuestion.a}
                    </div>
                    <div
                        className={`answer-box bg-[#e4efc4] ${highlightedAnswer === 'b' ? 'border-4 border-blue-500' : ''} ${selectedAnswer === 'b' && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer === 'b' && isCorrect ? 'bg-green-500 text-white' : ''}`}
                        onClick={() => handleAnswerClick('b')}
                    >
                        {currentQuestion.b}
                    </div>
                    <div
                        className={`answer-box bg-[#FEEE91] ${highlightedAnswer === 'c' ? 'border-4 border-blue-500' : ''} ${selectedAnswer === 'c' && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer === 'c' && isCorrect ? 'bg-green-500 text-white' : ''}`}
                        onClick={() => handleAnswerClick('c')}
                    >
                        {currentQuestion.c}
                    </div>
                    <div
                        className={`answer-box bg-[#CD8D7A] ${highlightedAnswer === 'd' ? 'border-4 border-blue-500' : ''} ${selectedAnswer === 'd' && !isCorrect ? 'bg-red-500 text-white' : ''} ${selectedAnswer === 'd' && isCorrect ? 'bg-green-500 text-white' : ''}`}
                        onClick={() => handleAnswerClick('d')}
                    >
                        {currentQuestion.d}
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

            
            </div>
        </div>
    );
};

export default QuestionSection;