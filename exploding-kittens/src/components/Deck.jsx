import React from "react";
import { useState } from "react";
import cardDeckAsset from "../cardArtWork/cardDeckAsset.webp";
import beardCatArt from "../cardArtWork/Beard-Cat.jpg";
import useStore from "../UseStore";

const Deck = () => {

   //replace with react redux or global state manager instead

   const [numberOfcardsIndeck, setNumberOfCardsInDeck] = useState(60);
   const [numberOfExplodingKittens, setNumberOfExplodingKittens] = useState(4);
   
   
   const drawNewCard = useStore((state) => state.drawCard);

   const nextCard =  {
    title: "Beard Cat",
    description: "Junk",
    artWork: beardCatArt,
    cardType: "junk"}

    const drawCard = () => {
      drawNewCard(nextCard)
    }

  return (
    <div className="flex flex-row gap-2">
      <div className="w-48 h-48 rounded-lg border-4 border-gray-300 relative flex items-center" onClick={() => drawCard()} >
        <span className="absolute inset-0 flex items-center justify-center text-gray-200 text-5xl font-bold z-0">
          Deck
        </span>
        <div className="relative z-10">
          <img
            className="object-cover object-center"
            src={cardDeckAsset}
            alt="deck"
          />
        </div>
      </div>

      <div className="w-48 h-48 rounded-lg border-4 border-gray-300 relative flex items-center">
        <span className="absolute inset-0 flex items-center justify-center text-gray-200 text-5xl font-bold z-0">
          {Math.trunc((numberOfExplodingKittens / numberOfcardsIndeck) * 100)}% ⚠
        </span>
      </div>
    </div>
  );
};

export default Deck;
