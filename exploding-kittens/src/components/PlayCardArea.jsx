import React, { useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import useStore from "../UseStore";

const PlayCardArea = ({ draggedCard, setDraggedCard }) => {
  const cardsInPlayArea = useStore((state) => state.cardsInPlayArea);
  const addCardToPlayArea = useStore((state) => state.addCardToPlayArea);
  const getCardArt = useStore((state) => state.getCardArt);
  const sendData = useStore((state) => state.sendData);

  const handleDrop = () => {
    if (draggedCard) {
      addCardToPlayArea(draggedCard);
      console.log(draggedCard);
      sendData("playCard", {
        title: draggedCard.title,
        description: draggedCard.description,
        artWork: draggedCard.artWork,
        cardType: draggedCard.cardType,
      });
      setDraggedCard(null); // Reset the dragged card
    }
  };

  return (
    <motion.div
      onDragOver={(e) => e.preventDefault()} // Allows the drop event
      onDrop={handleDrop}
    >
      <div className="w-full h-48 rounded-lg border-4 border-gray-300 relative flex items-center justify-center">
        <span
          className="absolute inset-0 flex items-center justify-center text-gray-200 text-5xl font-bold z-0"
          draggable="false"
        >
          PLAY AREA
        </span>
        <div className="relative z-10 flex">
          {cardsInPlayArea.map((card, index) => {
            const cardArt = getCardArt(card.artWork);
            return (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                artWork={cardArt}
                cardType={card.cardType}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default PlayCardArea;
