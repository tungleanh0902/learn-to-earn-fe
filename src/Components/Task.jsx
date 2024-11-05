import React, { useState } from 'react';
// import TaskItem from './TaskItem';

const Task = () => {
    const Categories = [
        { name: "All" }, 
        { name: "Onchain" },
        { name: "Academy" },
        { name: "Social"},    
    ];
    const [active, setActive] = useState(0);

    const handleClick = (index) => {
        setActive(index);
    }

    return (
        <div>
            <ul className="flex space-x-1">
                {Categories.map((category, i) => (
                    <li key={i} className={`cursor-pointer ${active === i ? 'text-white' : 'text-gray-500'}`} onClick={() => handleClick(i)}>
                        <a className="block px-4 py-2 font-adlam-display">
                            {category.name}
                        </a>
                    </li>
                ))}
            </ul>       
        </div>
    );
};

export default Task;