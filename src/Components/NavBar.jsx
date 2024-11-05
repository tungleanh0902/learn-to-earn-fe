import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-[#1e1e1e]">
      <div className="text-white flex justify-around py-4">
        <Link to="/">
          <div>Home</div>
        </Link>
        <Link to="./Components/Earn">
          <div>Earn</div>
        </Link>
        <Link to="./Components/Learn">
          <div>Learn</div>
        </Link>
        <Link to="./Components/Leaderboard">
          <div>Leaderboard</div>
        </Link>
        <Link to="./Components/Wallet">
          <div>Wallet</div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;