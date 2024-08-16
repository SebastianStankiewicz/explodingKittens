import React, { useState } from "react";
import Card from "../components/Card";

import PlayerHand from "../components/PlayerHand";
import PlayCardArea from "../components/PlayCardArea";
import TurnOrder from "../components/TurnOrder";
import Deck from "../components/Deck";

const GamePage = () => {
  const [draggedCard, setDraggedCard] = useState(null);
 

  return (
    <>
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10">
        <TurnOrder />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <div className="mb-8">
          {" "}
          {/* Space between Deck and PlayCardArea */}
          <Deck />
        </div>
        <div className="w-full max-w-4xl h-[300px]">
          <PlayCardArea draggedCard={draggedCard} setDraggedCard={setDraggedCard} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
        <PlayerHand setDraggedCard={setDraggedCard} />
      </div>
    </>
  );
};

export default GamePage;
