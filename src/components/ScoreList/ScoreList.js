import React, { useEffect, useState } from 'react';
import './ScoreList.scss';

const ScoreList = (props) => {

    const [scores, SetScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            const response = await fetch("http://service/buzzbar-server/public/api/GetScores");
            const result = await response.json();
        
            SetScores(result.result);
        }    
        fetchScores();
    }, [])

    let rows = scores.map(item => {
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.total}</td>
                <td>{item.hits}</td>
                <td>{item.score}</td>
            </tr>
        )
    })

    return (
        <table className="ScoreList">
            <thead>
                <tr>
                    <th>Player</th>
                    <th>total</th>
                    <th>hits</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

export default ScoreList;