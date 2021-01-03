import { useRef, useState } from 'react';
import _ from 'underscore';

import Ground from './components/ground';
import ScoreList from './components/ScoreList/ScoreList';

function App() {

  const [player, SetPlayer] = useState({});
  const playerInput = useRef();

  const StartGame = () => {

    SetPlayer({
      name: playerInput.current.value,
      totalMoles: 0,
      score: 0,
      playing: true
    });
  }

  const NewGame = () => {
    
    SetPlayer({
      ...player,
      totalMoles: 0,
      score: 0,
      playing: true
    });

  }

  if (_.isEmpty(player))
    return (
      <div>
        Type your name :
        <input type="text" name="player" id="player" ref={playerInput} />
        <button onClick={StartGame}>Enter the game</button>
        <ScoreList />
      </div>
    );

  if (player.playing)
    return (
      <div align="center">
        <Ground
          player={player}
          SaveScore={SetPlayer}
        />
      </div>
    );

  return (
    <div>
      <h3>End Game</h3>
      <h3>total moles : {player.totalMoles}</h3>
      <h3>Your Score: {player.score}</h3>
      <button onClick={NewGame}>Retry</button>
      <ScoreList />
    </div>
  );
}

export default App;
