import { create } from "zustand";

import nopeCardArt from "./cardArtWork/Nope-A-Jackanope-Bounds-into-the-Room.jpg";
import beardCatArt from "./cardArtWork/Beard-Cat.jpg";
import defuseCardArt from "./cardArtWork/Defuse-Via-3AM-Flatulence.jpg";

const useStore = create((set) => ({
  cardsInPlayArea: [
    {
      title: "Beard Cat",
      description: "Junk",
      artWork: beardCatArt,
      cardType: "junk",
    },
  ],

  cardsInPlayerHand: [
    {
      title: "Nope",
      description: "A nope card",
      artWork: nopeCardArt,
      cardType: "nope",
    },
    {
      title: "Beard Cat",
      description: "Junk",
      artWork: beardCatArt,
      cardType: "junk",
    },
    {
      title: "Defuse Card",
      description: "Defuses a single exploding kitten.",
      artWork: defuseCardArt,
      cardType: "defuse",
    },
    {
      title: "Nope",
      description: "A nope card",
      artWork: nopeCardArt,
      cardType: "nope",
    },
    {
      title: "Nope",
      description: "A nope card",
      artWork: nopeCardArt,
      cardType: "nope",
    },
  ],

  addCardToPlayArea: (card) =>
    set((state) => {
      const cardIndex = state.cardsInPlayerHand.findIndex(
        (c) =>
          c.title === card.title &&
          c.description === card.description &&
          c.artWork === card.artWork &&
          c.cardType === card.cardType
      );

      if (cardIndex !== -1) {
        return {
          cardsInPlayArea: [...state.cardsInPlayArea, card],
          cardsInPlayerHand: state.cardsInPlayerHand.filter(
            (_, index) => index !== cardIndex
          ),
        };
      }

      return state; // If card isn't found, return state as is.
    }),

  drawCard: (card) =>
    set((state) => {
      return {
        cardsInPlayArea: [...state.cardsInPlayArea, card],
      };
    }),
}));

export default useStore;
