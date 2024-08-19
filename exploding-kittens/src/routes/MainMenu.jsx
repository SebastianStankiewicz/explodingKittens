import React from "react";

import useStore from '../UseStore';
import { Link } from 'react-router-dom';

const MainMenu = () => {
    const { setUserName, setGameId } = useStore((state) => ({
        setUserName: state.setUserName,
        setGameId: state.setGameId,
      }));

    const gameId = useStore((state) => state.gameId);

    const handleUsernameChange = (e) => {
        setUserName(e.target.value);
      };
    
    const handleGameCodeChange = (e) => {
        setGameId(e.target.value);
        console.log(gameId);
      };




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Host or Join Game
        </h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-400 mb-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleUsernameChange}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-400 mb-1"
            htmlFor="gameCode"
          >
            Game Code
          </label>
          <input
            id="gameCode"
            type="text"
            placeholder="(Leave blank if hosting)"
            onChange={handleGameCodeChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-400 mb-1"
            htmlFor="numberOfPlayers"
          >
            Number of Players
          </label>
          <input
            id="numberOfPlayers"
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <Link to="/gameLobby"  className="w-full mr-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Host Game</Link>
          <button className="w-full ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
