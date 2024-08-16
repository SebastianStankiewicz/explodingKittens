import React from "react";
import { useState } from "react";
import cardDeckAsset from "../cardArtWork/cardDeckAsset.webp";
import beardCatArt from "../cardArtWork/Beard-Cat.jpg";
import useStore from "../UseStore";
import { drawNewCardAPI } from "../api";

const Deck = () => {

   const [numberOfcardsIndeck, setNumberOfCardsInDeck] = useState(60);
   const [numberOfExplodingKittens, setNumberOfExplodingKittens] = useState(4);
   
   
   const drawNewCard = useStore((state) => state.drawCard);

   const nextCard =  {
    title: "Beard Cat",
    description: "Junk",
    artWork: beardCatArt,
    cardType: "junk"}

    //Bring to the store/ seperate file for websocket "stuff"
    const getNextCardToBeDrawn = async () => {
      try{
        const response = await drawNewCardAPI("a", 2272);
        console.log(response)
        drawNewCard(response);

      } catch(err){
        console.log(err)
      }
    }

    const drawCard = () => {
      drawNewCard(nextCard)
    }

  return (
    <div className="flex flex-row gap-2">
      <div className="w-48 h-48 rounded-lg border-4 border-gray-300 relative flex items-center" onClick={() => getNextCardToBeDrawn()} >
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
