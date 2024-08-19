import React from "react";
import useStore from '../UseStore';

const GameLobby = () => {

  const gameId = useStore((state) => state.gameId);
  const userName = useStore((state) => state.userName);

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8">
  <p className="text-gray-800 text-5xl font-bold">Game Code: {gameId}</p> 
  
  <div className="flex space-x-8">
    <div className="flex flex-col items-center">
      <div className="rounded-full w-12 h-12 flex items-center justify-center text-white font-bold bg-purple-400">
        You
      </div>
      <span className="mt-2 text-sm">{userName}</span>
    </div>

    <div className="flex flex-col items-center">
      <div className="rounded-full w-12 h-12 flex items-center justify-center text-white font-bold bg-purple-400">
        P2
      </div>
      <span className="mt-2 text-sm">Bill</span>
    </div>

  </div>
  <p className="text-gray-800 text-3xl font-bold">Waiting for 4 more players...</p>
</div>
  );
};

export default GameLobby;
