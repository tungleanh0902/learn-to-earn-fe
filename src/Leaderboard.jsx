import React from 'react';

// demo stuffs
import vatani from './assets/Vatani.png';
import top3 from './assets/Top3.png';
import top6 from './assets/Top6.png';
import cute from './assets/cute.png'; 
import abc from './assets/chibi.png';

// end of demo stuffs   

const Leaderboard = () => {
    return (
        <div className="bg-[#1e1e1e] flex flex-row w-screen">
            <div className="bg-[#1e1e1e] overflow-hidden w-screen max-h-[90vh] relative">
                {/* <div className="text-white font-bold text-3xl relative pt-[15vh] font-auvicwant">Coming soon...</div>

                <img
                    src={abc}
                    alt="cute"
                    className="pt-[5vh] scale-[80%]"
                ></img> */}

                    <div className="relative pt-[7vh]">
                        <img
                        className="items-center mx-auto"
                        src={vatani}
                        alt="vatani">
                        </img>
                    </div>

                    <div className="relative pt-[2vh]">
                        <img
                            className="items-center mx-auto"
                            src={top3}
                            alt="Top 3">
                        </img>
                    </div>

                    <div className="relative pt-[2vh] max-h-[33.2vh] overflow-y-auto">
                        <img
                            className="items-center mx-auto"
                            src={top6}
                            alt="Top 6">
                        </img>
                    </div>
            </div>
        </div>
    );
};

export default Leaderboard;