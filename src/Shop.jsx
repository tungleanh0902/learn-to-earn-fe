import React, { useState } from 'react';
import Shopping from './Components/Shopping';
import Orders from './Components/Orders';
import Listing from './Components/Listing';

const Shop = () => {
  const [tab, setTab] = useState(1)

  return (
      <>
      <div className="bg-[#1e1e1e] justify-center w-full h-full flex items-center">
        <nav>
          <div className="bg-[#707579] my-[20px] rounded-[7px]">
            <button className={`${tab == 1 ? "active" : "" } w-[120px] rounded-[7px]`} type="button" onClick={() => setTab(1)}>
              Shop
            </button>
            <button className={`${tab == 2 ? "active" : "" } w-[120px] rounded-[7px]`} type="button" onClick={() => setTab(2)}>
              History
            </button>
            <button className={`${tab == 3 ? "active" : "" } w-[120px] rounded-[7px]`} type="button" onClick={() => setTab(3)}>
              Listing
            </button>
          </div>
        </nav>
      </div>

      {
        tab == 1 ? 
        <Shopping />
        : tab == 2 ?
        <Orders />
        :
        <Listing />
      }
      </>
  );
};

export default Shop;