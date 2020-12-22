import React, { useEffect, useState } from 'react';
import Hole from './Hole/hole';

const Ground = (props) => {

    const HoleCount = 7;

    const [timer, SetTimer] = useState(60);
    const [score, SetScore] = useState(0);
    const [molePos, SetmolePos] = useState(0);

    useEffect(()=>{
        setInterval(()=>{
            SetTimer(timer-1);
        }, 1000);
    }, []);

    useEffect(()=>{
        if(timer > 0)
            return;
        console.log("end");
    },[timer]);

    useEffect(()=> {

        let random = Math.floor(Math.random() * 7) + 1 ; 
        SetmolePos(random);

    }, [score]);

    const AddScore = () => {
        SetScore(score+1);
    }

    let holes = [];
    for (let i = 1; i < HoleCount; i++) {
        holes.push(<Hole 
            id={i} 
            molPos={molePos}
            AddScore={AddScore}
            />);
    }

    return (
        <div align="center">
            <h3>Play Time remain: {timer} </h3>
            <br />
            {holes}
        </div>);
}

export default Ground;