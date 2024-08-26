import { create } from "zustand";
import { io } from 'socket.io-client';

import nopeCardArt from "./cardArtWork/Nope-A-Jackanope-Bounds-into-the-Room.jpg";
import beardCatArt from "./cardArtWork/Beard-Cat.jpg";
import defuseCatArt from "./cardArtWork/Defuse-Via-3AM-Flatulence.jpg";
import attackCardArt from "./cardArtWork/Attack-Bear-o-Dactyl.jpg";
import favourCardArt from "./cardArtWork/Favor-Fall-So-Deeply-in-Love.jpg"
import shuffleCardArt from "./cardArtWork/Shuffle-A-Kraken-Emerges-and-Hes-Super-Upset.jpg"
import seeTheFutureCardArt from "./cardArtWork/See-the-Future-Ask-the-All-Seeing-Goat-Wizard.jpg"
import explodingKittenArt from "./cardArtWork/Exploding-Kitten-Alien.jpg"
import tacoCatArt from "./cardArtWork/Tacocat.jpg";
import watermelonCatArt from "./cardArtWork/Cattermelon.jpg";
import pooCatArt from "./cardArtWork/Hairy-Potato-Cat.jpg";
import rainbowCatArt from "./cardArtWork/Rainbow-Ralphing-Cat.jpg"
import skipCardArt from "./cardArtWork/Skip-Commandeer-a-Bunnyraptor.jpg"

const useStore = create((set, get) => ({

  artworkMapping: {
    'nopeCardArt': nopeCardArt,
    'beardCatArt': beardCatArt,
    'tacoCatArt': tacoCatArt,
    'watermelonCatArt':watermelonCatArt,
    'pooCatArt': pooCatArt,
    'rainbowCatArt': rainbowCatArt,
    'defuseCatArt': defuseCatArt,
    'attackCardArt': attackCardArt,
    'favourCardArt': favourCardArt,
    'shuffleCardArt': shuffleCardArt,
    'seeTheFutureCardArt': seeTheFutureCardArt,
    'explodingKittenArt': explodingKittenArt,
    'skipCardArt': skipCardArt

  },

  getCardArt: (artWorkIdentifier) => {
    return (get().artworkMapping[artWorkIdentifier]);
  },

  cardsInPlayArea: [],

  cardsInPlayerHand: [],

  gameId: null,
  userName: null,
  setGameId: (newGameId) => set({ gameId: newGameId }),
  setUserName: (newUserName) => set({ userName: newUserName }),

  lobbyUserNames: [],
  numberOfPlayersToJoin: null,

  gameStarted: false,

  socketData: [],

  

  connect: (url) => {
    const socket = io(url);

    socket.on("connect", () => {
      console.log("Connected to socket.io server");
      set({ socket });
    });

    socket.on("game_created", (message) => {
      console.log(message);
      set({ gameId: message.roomCode });
    });

    socket.on("player_joined_game", (message) => {
      console.log(message);
      set( {lobbyUserNames: message.playerUserNames})
      set( {numberOfPlayersToJoin: message.playersLeftToJoin})
    });

    socket.on("add_card_to_hand", (message) => {
      console.log(message);
      set((state) => ({cardsInPlayerHand: [...state.cardsInPlayerHand, message]}))
    });



    socket.on("start_game", (message) => {
      const userName = get().userName;
      set({ cardsInPlayerHand: message[userName] });
      set({gameStarted: true});
      console.log(message.userName)
      
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from socket.io server");
      set({ socket: null });
    });

    socket.on("update", (message) => {
      set((state) => ({
        socketData: [...state.socketData, message],
      }));
    });

    set({ socket });
  },

  //Will be using json
  sendData: (data, message) => {
    const { socket } = useStore.getState();
    if (socket) {
      socket.emit(data, message);
      console.log(`Emitted message to event ${data}:`, message);
    } else {
      console.error('Socket is not connected');
    }
  },


  
//VISUAL NOT IMPACTING GAME LOGIC
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
