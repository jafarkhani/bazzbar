import React, { useEffect, useRef, useState } from 'react';
import Hole from './Hole/hole';

const Ground = (props) => {

    const HoleCount = 7;
    const timeout = useRef(null);
    const interval = useRef(null);

    const [loading, SetLoading] = useState(false);
    const [timer, SetTimer] = useState(3);
    const [hits, Sethits] = useState(0);
    const [totalMoles, SettotalMoles] = useState(0);
    const [molePos, SetmolePos] = useState(0);


    useEffect(() => {
        interval.current = setInterval(() => {
            SetTimer(timer => timer - 1);
        }, 1000);

        SettotalMoles(totalMoles + 1);

    }, [props.player]);

    useEffect(() => {
        if (timer > 0)
            return;

        clearInterval(interval.current);
        clearTimeout(timeout.current);
        // save the hits 
        SaveScore();

    }, [timer]);

    function ComputScore(hits, total){
        return Math.round((hits/total)*100);
    }

    const SaveScore = async () => {

        SetLoading(true);
        fetch("http://localhost:5000/AddScore?" + new URLSearchParams({
            name: props.player.name,
            total: totalMoles,
            hits: hits,
            score: ComputScore(hits,totalMoles)

        })).then(response => {
                SetLoading(false);
                props.SaveScore({
                    ...props.player,
                    playing: false,
                    hits: hits,
                    score: ComputScore(hits,totalMoles),
                    totalMoles: totalMoles
                })
            })
    }

    useEffect(() => {

        if (totalMoles === 0)
            return;

        let random;
        while(true){
            random = Math.floor(Math.random() * 7) + 1;
            if(random !== molePos)
                break;
        }
        SetmolePos(random);

        timeout.current = setTimeout(() => {
            console.log("timeout")
            SettotalMoles(totalMoles + 1);
        }, 1000);

    }, [totalMoles]);

    const Addhit = () => {
        Sethits(hits + 1);
        clearTimeout(timeout.current);
        SettotalMoles(totalMoles + 1);
    }

    let holes = [];
    for (let i = 1; i <= HoleCount; i++) {
        holes.push(<Hole
            key={i}
            id={i}
            totalMoles={totalMoles}
            hits={hits}
            molPos={molePos}
            Addhit={Addhit}
        />);
    }

    if (loading)
        return (
            <div>Save hits ....</div>
        );

    return (
        <div align="center">
            <h3>Player: {props.player.name} </h3>
            <h3>Play Time remain: {timer} </h3>
            <h3>Total Moles: {props.player.totalMoles} </h3>
            <h3>Your hits: {props.player.hits} </h3>
            <h3>Your score: {props.player.score} </h3>
            {holes}
        </div>);
}

export default Ground;