import React, { useEffect, useRef, useState } from 'react';
import Hole from './Hole/hole';

const Ground = (props) => {

    const HoleCount = 7;
    const timeout = useRef(null);
    const interval = useRef(null);

    const [loading, SetLoading] = useState(false);
    const [timer, SetTimer] = useState(20);
    const [score, SetScore] = useState(0);
    const [totalMoles, SettotalMoles] = useState(0);
    const [molePos, SetmolePos] = useState(0);


    useEffect(()=>{
        interval.current = setInterval(()=>{
            console.log("fdf")
            SetTimer(timer => timer-1);                       
        }, 1000);

        SettotalMoles(totalMoles+1); 

    }, [props.player]);

    useEffect(()=>{
        if(timer > 0)
            return;
        
        clearInterval(interval.current); 
        clearTimeout(timeout.current); 
        // save the score 
        SaveScore();

    },[timer]);

    const SaveScore = async () => {

        fetch("http://service/buzzbar-server/api/AddScore" +  new URLSearchParams({
            Player : props.player,
            score: score
        })).then(response => response.json())
        .then(result => {
            console.log("save score")

        })
        
    }
    
    useEffect(() => {
        let random = Math.floor(Math.random() * 7) + 1 ; 
        console.log(random);
        SetmolePos(random);

        timeout.current = setTimeout(()=>{
            console.log("timeout")
            FailScore();
        },2000);

    },[totalMoles]);

    const AddScore = () => {
        SetScore(score+1);           
        clearTimeout(timeout.current );     
        SettotalMoles(totalMoles+1);
    }

    const FailScore = () => {
        
        SettotalMoles(totalMoles+1);        
    }


    let holes = [];
    for (let i = 1; i <= HoleCount; i++) {
        holes.push(<Hole 
            key={i}
            id={i} 
            totalMoles={totalMoles}
            score={score}
            molPos={molePos}
            AddScore={AddScore}
            FailScore={FailScore}
            />);
    }

    if(timer === 0)
        return <div>End Game</div>

    return (
        <div align="center">
            <h3>Player: {props.player} </h3>      
            <h3>Play Time remain: {timer} </h3>            
            <h3>Total Moles: {totalMoles} </h3>            
            <h3>Your Score: {score} </h3>
            {holes}
        </div>);
}

export default Ground;