import React, { useState } from 'react';
import Hole from './Hole/hole';

const Ground = () => {

    
    const HoleCount = 7;
    const [score, SetScore] = useState(0);

    let holes = [];
    for (let i = 1; i < HoleCount; i++) {
        holes.push(<Hole 
            id={i} 

            />);
    }

    return (
        <div>
            {holes}
        </div>);
}

export default Ground;