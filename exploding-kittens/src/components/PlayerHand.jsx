import React, { useState } from "react";
import Card from "./Card";

import { motion, useDragControls } from "framer-motion";

import useStore from "../UseStore";

const PlayerHand = ({ setDraggedCard }) => {
  const cardsInHand = useStore((state) => state.cardsInPlayerHand);
  const addCardToPlayArea = useStore((state) => state.addCardToPlayArea);
  const getCardArt = useStore((state) => state.getCardArt);

  const controls = useDragControls();

  function startDrag(event, card) {
    controls.start(event);
    setDraggedCard(card);
  }

  function clickToPlayCard(card) {
    addCardToPlayArea(card);
  }

  return (
    <div>
      <div className="w-full h-48 rounded-lg border-4 border-gray-300 relative flex items-center justify-center">
        <span className="absolute inset-0 flex items-center justify-center text-gray-200 text-5xl font-bold z-0">
          YOUR CARDS
        </span>
        <motion.div className="relative z-10 flex">
          {cardsInHand.map((card, index) => {
            const cardArt = getCardArt(card.artWork);
            return (
              <motion.div
                key={index}
                drag
                dragControls={controls}
                className="card-container"
                onDragStart={(event) => startDrag(event, card)}
                onDragEnd={() => setDraggedCard(null)}
                onClick={() => clickToPlayCard(card)}
                style={{ pointerEvents: "all" }}
              >
                <Card
                  title={card.title}
                  description={card.description}
                  artWork={cardArt}
                  cardType={card.cardType}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default PlayerHand;
