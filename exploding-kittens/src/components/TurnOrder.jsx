import React from "react";

const TurnOrder = () => {

    const currentPlayer = 1;
  return (
<div className="flex items-center justify-center space-x-8">
  <div className="flex flex-col items-center">
    <div className={`rounded-full w-12 h-12 flex items-center justify-center text-white font-bold ${currentPlayer === 1 ? 'bg-purple-500' : 'bg-red-500'}`}>P1</div>
    <span className="mt-2 text-sm">Alan</span>
  </div>
  <div className="flex flex-col items-center">
    <div className={`rounded-full w-12 h-12 flex items-center justify-center text-white font-bold ${currentPlayer === 2 ? 'bg-purple-500' : 'bg-red-500'}`}>P2</div>
    <span className="mt-2 text-sm">You</span>
  </div>
  <div className="flex flex-col items-center">
    <div className={`rounded-full w-12 h-12 flex items-center justify-center text-white font-bold ${currentPlayer === 3 ? 'bg-purple-500' : 'bg-red-500'}`}>P3</div>
    <span className="mt-2 text-sm">Cassie</span>
  </div>
  <div className="flex flex-col items-center">
    <div className={`rounded-full w-12 h-12 flex items-center justify-center text-white font-bold ${currentPlayer === 4 ? 'bg-purple-500' : 'bg-red-500'}`}>P4</div>
    <span className="mt-2 text-sm">Danny</span>
  </div>
  <div className="flex flex-col items-center">
    <div className={`rounded-full w-12 h-12 flex items-center justify-center text-white font-bold ${currentPlayer === 5 ? 'bg-purple-500' : 'bg-red-500'}`}>P5</div>
    <span className="mt-2 text-sm">Eliiot</span>
  </div>

</div>

  );
};

export default TurnOrder;
