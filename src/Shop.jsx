import React, { useState } from 'react';
import Shopping from './Components/Shopping';
import Orders from './Components/Orders';

const Shop = () => {
  const [isShopping, setIsShopping] = useState(true)

  return (
      <>
      <div className="bg-[#1e1e1e] justify-center w-full h-full flex items-center">
        <nav>
          <div className="bg-[#707579] my-[20px] rounded-[7px]">
            <button className={`${isShopping ? "active" : "" } w-[180px] rounded-[7px]`} type="button" cl onClick={() => setIsShopping(true)}>
              Shop
            </button>
            <button className={`${isShopping ? "" : "active" } w-[180px] rounded-[7px]`} type="button" onClick={() => setIsShopping(false)}>
              Orders
            </button>
          </div>
        </nav>
      </div>

      {
        isShopping ? 
        <Shopping />
        :
        <Orders />
      }
      </>
  );
};

export default Shop;