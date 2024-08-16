import React, { useState } from 'react'
import nopeCardArt from "../cardArtWork/Nope-A-Jackanope-Bounds-into-the-Room.jpg";
import beardCatArt from "../cardArtWork/Beard-Cat.jpg";
import defuseCardArt from "../cardArtWork/Defuse-Via-3AM-Flatulence.jpg";
import Card from './Card';
import { motion } from "framer-motion";
import useStore from '../UseStore';

const PlayCardArea = ({ draggedCard, setDraggedCard }) => {

  const cardsInPlayArea = useStore((state) => state.cardsInPlayArea);
  const addCardToPlayArea = useStore((state) => state.addCardToPlayArea);

  const handleDrop = () => {
    if (draggedCard) {
      addCardToPlayArea(draggedCard);
      console.log(draggedCard)
      setDraggedCard(null); // Reset the dragged card
    }
  };

  return (
    <motion.div       onDragOver={(e) => e.preventDefault()} // Allows the drop event
    onDrop={handleDrop}>
        <div className="w-full h-48 rounded-lg border-4 border-gray-300 relative flex items-center justify-center">
        <span className="absolute inset-0 flex items-center justify-center text-gray-200 text-5xl font-bold z-0" draggable="false" >
        PLAY AREA
      </span>
      <div className="relative z-10 flex">
          {cardsInPlayArea.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              artWork={card.artWork}
              cardType={card.cardType}
            />
          ))}
        </div>
        </div>
    </motion.div>
  )
}

export default PlayCardArea