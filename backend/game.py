from card import Card
from player import Player
import random

#Create the card list.  UP TO 5 PLAYERS


cardList = []


def createCards(title, description, imageURl, cardType, numberOfCopies):
    for i in range(numberOfCopies):
        cardList.append(Card(title, description, imageURl, cardType))

createCards("Nope", "Stop any action except for an Exploding Kitten or a defuse Card.", "nopeCardArt", "nope", 5)
createCards("Attack", "End your turn without drawing and force the next player to take 2 turns in a row.", "attackCardArt", "attack", 4)
createCards("Skip", "Immediatley end your turn without drawing a card.", "skipCardArt", "skip", 4)
createCards("Favour", "Force any other player to give you 1 card from their hand. They choose which card to give you", "favourCardArt", "favour", 4)
createCards("Shuffle", "Shuffle the draw pile.", "shuffleCardArt", "shuffleCardArt", 4)
createCards("See the future", "Peek at the top 3 cards from the draw pile", "seeTheFutureCardArt", "future", 5)

createCards("Taco Cat", "Junk", "tacoCatArt", "junk", 4)
createCards("Watermelon Cat", "Junk", "watermelonCatArt", "junk", 4)
createCards("Poo Cat", "Junk", "pooCatArt", "junk", 4)
createCards("Beard Cat", "Junk", "beardCatArt", "junk", 4)
createCards("Rainbow Cat", "Junk","rainbowCatArt",  "junk", 4)


class Game:
    def __init__(self, gameId, numberOfPlayers) -> None:
        self.gameId = gameId
        self.players = []
        self.deck = []
        self.currentPlayerTurnIndex = 0
        self.numberOfPlayers = numberOfPlayers
        
    def startGame(self, playerNames: list):
        #playerNames is a list of all the player names
        #Start by creating all the player objects
        self.deck = cardList.copy()
        random.shuffle(self.deck)

        for i, userName in enumerate(playerNames):
            startingHand = []
            for j in range(4):
                startingHand.append(self.deck.pop())
            self.players.append(Player(userName, i, startingHand))
        
        for i in range(self.numberOfPlayers - 1):
            self.deck.append(Card("Exploding kitten", "Must play a defuse or loose the game!", "explodingKittenArt", "kitten"))
        
        for i in range(6 - self.numberOfPlayers):
            self.deck.append(Card("Defuse", "Defuses 1 exploding kitten", "defuseCatArt", "defuse"))
        random.shuffle(self.deck)

    def playCard(self, player, cardType, targetIndex=None):
        #Check its the players turn
        if player.playerNumber == self.currentPlayerTurnIndex:
            if player.checkIfCardTypeInHand(cardType):
                player.removeCardFromHand(cardType)
                print(f"{self.players[self.currentPlayerTurnIndex].userName} Played {cardType}")
                if cardType == "attack":
                    self.advanceTurn(1)
                    self.players[targetIndex].attacked = True
                    data = {"title": cardType,
                            "attackedPlayerName": self.players[targetIndex].userName,}
                if cardType == "skip":
                    self.advanceTurn(1)
                    data = {"cardPlayed": cardType,}
                if cardType == "favour": 
                    print("Come back and do later")
                if cardType == "future": 
                    nextCards = []
                    if len(self.deck) < 3:
                        for card in self.deck:
                            nextCards.append(card.title)
                    else:
                        print(*(card.title for card in self.deck[:3]))
                        nextCards.extend(card.title for card in self.deck[:3]) #I think this is wrong or Im drawing from the wrong end of the deck.
                    data = {"cardPlayed": cardType,
                            "nextThreeCards": nextCards}

                if cardType == "shuffle":
                    random.shuffle(self.deck)
                    data = {"cardPlayed": cardType
                            }
                if cardType == "junk":
                    data = {"cardPlayed": cardType}
                return data
            else:
                print(f"Dont have in hand {cardType}")
            
        return {"message": "Card not in hand"}
                
    def drawCard(self):
        print(f"{self.players[self.currentPlayerTurnIndex].userName} Drew a card")
        drawnCard = self.deck.pop()
        if drawnCard.cardType == "kitten":
            print("Drew exploding kitten")
            self.deck.append(Card("Exploding kitten", "Must play a defuse or loose the game!", "IMGURL", "kitten"))
            random.shuffle(self.deck)
        else:
            self.players[self.currentPlayerTurnIndex].addCardToHand(drawnCard)
        
        #If the player is attacked then unmark as attacked and dont increment index
        if self.players[self.currentPlayerTurnIndex].attacked:
            self.players[self.currentPlayerTurnIndex].attacked = False
        else:
            self.advanceTurn(1)
        
        return(drawnCard)
                  
    def advanceTurn(self, increment=1):
        if self.currentPlayerTurnIndex == len(self.players) - 1:
            self.currentPlayerTurnIndex = 0
        else:
            self.currentPlayerTurnIndex += 1
        print(f"{self.players[self.currentPlayerTurnIndex].userName} turn")
                    
    def checkIfPlayersTurn(self, userName):
        for index, player in enumerate(self.players):
            if userName == player.userName:
                return index == self.currentPlayerTurnIndex
        return False


