


import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Ground from './components/ground';

function App() {

  const [player, SetPlayer] = useState(null);
  const playerInput = useRef();
  useEffect(() => {

  }, [])

  const StartGame = () => {

    SetPlayer(playerInput.current.value);
  }

  const NewGame = () => {

    SetPlayer(null);

  }

  if (player == null)
    return (
      <div>
        Type your name :
        <input type="text" name="player" id="player" ref={playerInput} />
        <button onClick={StartGame}>Enter the game</button>
      </div>
    );

  return (
        <div align="center">
          <Ground player={player} />
          <button onClick={NewGame}>StartNewGame</button>
        </div>
    

    
  );
}

export default App;
