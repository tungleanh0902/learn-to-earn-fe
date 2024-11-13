import React from 'react';
import cute from './assets/cute.png'; 
import abc from './assets/chibi.png'; 

const Leaderboard = () => {
    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen h-[90vh] relative">
                <div className="text-white font-bold text-3xl relative pt-[15vh] font-auvicwant">Coming soon...</div>

                <img
                    src={abc}
                    alt="cute"
                    className="pt-[5vh] scale-[80%]"
                ></img>
            </div>
        </div>
    );
};

export default Leaderboard;