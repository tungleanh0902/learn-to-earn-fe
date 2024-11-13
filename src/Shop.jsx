import React from 'react';
import Check from './assets/Check.png'

const Shop = () => {
  return (
    <div className="bg-[#1e1e1e] justify-center w-full h-full flex items-center">
      <div className="bg-[#1e1e1e] w-screen h-[90vh] relative overflow-x-hidden overflow-y-auto">
        <div className="relative bg-[#1e3e62] w-[80vw] h-[65vh] top-[5vh] left-[10vw] rounded-[15px]">
          <div className="relative text-white top-[1vh] font-adlam-display text-3xl break-words [text-shadow:0px_4px_4px_#00000040]">
            Get more with Premium
          </div>

          <div className="relative top-[3vh] grid grid-cols-4 font-afacad-variable">
            <div className="col-start-3 col-span-1 text-base text-variable-collection-unactive text-[#6e7478]">Free</div>
            <div className="col-start-4 col-span-1 text-base text-white [text-shadow:0px_4px_13px_#00000075] font-medium relative left-[-2vw]">Premium</div>

            <div className="col-start-1 col-span-2 pt-[2vh] font-medium text-white text-left relative left-[7vw]">Points Multiplier</div>
            <div className="col-start-3 col-span-1 pt-[2vh] text-[#6e7478]">1x</div>
            <div className="col-start-4 col-span-1 pt-[2vh] text-white relative left-[-2vw]">2x</div>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[1.5vh] font-medium text-white text-left relative left-[7vw]">Game tickets</div>
            <div className="col-start-3 col-span-1 pt-[1.5vh] text-[#6e7478]">8/day</div>
            <div className="col-start-4 col-span-1 pt-[1.5vh] text-white relative left-[-2vw]">25/day</div>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[1.5vh] font-medium text-white text-left relative left-[7vw]">Streak Saver</div>
            {/* <div className="col-start-3 col-span-1 pt-[1vh] text-[#6e7478]">8/day</div> */}
            <img src={Check} alt="Check" className="col-start-4 col-span-1 pt-[1vh] relative left-[5vw]"/>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[1vh] font-medium text-white text-left relative left-[7vw]">NFT Badge</div>
            {/* <div className="col-start-3 col-span-1 pt-[1vh] text-[#6e7478]">8/day</div> */}
            <img src={Check} alt="Check" className="col-start-4 col-span-1 pt-[1.5vh] relative left-[5vw]"/>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[1.5vh] font-medium text-white text-left relative left-[7vw]">Special Campaign</div>
            {/* <div className="col-start-3 col-span-1 pt-[1vh] text-[#6e7478]">8/day</div> */}
            <img src={Check} alt="Check" className="col-start-4 col-span-1 pt-[1.5vh] relative left-[5vw]"/>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>
          </div>

          <div className="relative text-white top-[5vh]">
            Only 2 TON ko biet font gi :) 
          </div>

          <div className="bg-white rounded-[20px] text-xl font-bold font-adlam-display absolute bottom-[2vh] w-[70vw] left-[5vw] py-[1vh]">
            BUY PREMIUM NOW
          </div>
        </div>

        <div className="relative top-[7vh] bg-[#1e3e62] w-[80vw] h-[30vh] left-[10vw] rounded-[15px]">
          <div className="font-nunito-bold text-white text-2xl left-[-15vw] relative top-[2vh]">
            Special Quizz
          </div>

          <div className="relative grid grid-cols-4 font-afacad-variable text-white">
            <div className="col-start-1 col-span-2 pt-[2vh] font-medium text-white text-left relative left-[7vw]">Points Multiplier</div>
            <div className="col-start-4 col-span-1 pt-[2vh] relative left-[-2vw]">5x</div>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[1.5vh] font-medium text-white text-left relative left-[7vw]">Special Campaign</div>
            {/* <div className="col-start-3 col-span-1 pt-[1vh] text-[#6e7478]">8/day</div> */}
            <img src={Check} alt="Check" className="col-start-4 col-span-1 pt-[1.5vh] relative left-[5vw]"/>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>
          </div>

          <div className="absolute bg-white rounded-[15px] bottom-[3vh] right-[4vw]">
            <div className="relative px-[2vw] py-[1vh] font-adlam-display [text-shadow:0px_4px_11px_#00000040]">BUY Special Quizz Now!</div>
          </div>
        </div>

        <div className="relative top-[9vh] bg-[#1e6252] w-[80vw] h-[50vh] left-[10vw] rounded-[15px]">
          <div className="relative pt-[4vh] font-adlam-display text-3xl text-white [text-shadow:0px_4px_4px_#00000040]">Streak Saver</div>

          <div className="relative font-medium pt-[3vh] pb-[1vh] text-white text-left left-[7vw] font-afacad-variable">Automatic save your streak</div>
          <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>

          <div className="relative grid grid-cols-4">
            <div className="relative col-start-1 col-span-3 text-left left-[7vw] text-white font-afacad-variable py-[1vh] font-medium">Pricing</div>
            <div className="relative col-start-4 col-span-1 text-white right-[7vw] font-afacad-variable py-[1vh] font-medium">0.1 Ton/day</div>
          </div>
          <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>

          <div className="absolute bottom-[5vh] bg-white rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-2xl">
            <div className="py-[1vh]">BUY NOW</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;