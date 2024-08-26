import React from "react";
import useStore from "../UseStore";
import { useState } from "react";
import GamePage from "./GamePage";





const GameLobby = () => {
  const gameId = useStore((state) => state.gameId);
  const numberOfPlayersToJoin = useStore(
    (state) => state.numberOfPlayersToJoin
  );
  const lobbyUserNames = useStore((state) => state.lobbyUserNames);

  const gameStarted = useStore((state) => state.gameStarted);

  return (
    <>
      {gameStarted ? (
        <GamePage/>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8">
            <p className="text-gray-800 text-5xl font-bold">
              Game Code: {gameId}
            </p>
            <div className="flex space-x-8">
              <div>
                {lobbyUserNames.map((name, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="rounded-full w-12 h-12 flex items-center justify-center text-white font-bold bg-purple-400">
                      P{index + 1}
                    </div>
                    <span className="mt-2 text-sm">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-800 text-3xl font-bold">
              Waiting for {numberOfPlayersToJoin} more players...
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default GameLobby;
