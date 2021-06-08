import React, { useEffect, useState } from "react";
import GameOver from "./components/GameOver";
import GameBoard from "./components/GameBoard";
import game from "./game/game";

function MemoryGame() {
  
  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(game.startCards());
  }, []);
 

  function restart() {
    game.restartPairCont();
    game.restartCards();
    game.endGame=false;
    setCards(game.startCards());
    setGameOver(false);
  }
  function handleFlip(card) {
  
    if (game.setCard(card.currentTarget.id)) {
     if (game.matchCheck()) {
         game.clearCards()
         if (game.endGameStatus()) {
            setGameOver(true);
         }
     } else if(game.secondCard!=null){
         setTimeout(() => {       
          game.resetFlip();
          game.clearCards()
          setCards([...game.cards]);
         }, 1000);
     }
  }
  setCards([...game.cards]);
  }

  return (
    <>
      <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
      <GameOver show={gameOver} handleRestart={restart}></GameOver>
    </>
  );
}

export default MemoryGame;
