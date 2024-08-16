from card import Card
from player import Player
import random

#Create the card list.  UP TO 5 PLAYERS


cardList = []


def createCards(title, description, imageURl, cardType, numberOfCopies):
    for i in range(numberOfCopies):
        cardList.append(Card(title, description, imageURl, cardType))

createCards("Nope", "Stop any action except for an Exploding Kitten or a defuse Card.", "imgURL", "nope", 5)
createCards("Attack", "End your turn without drawing and force the next player to take 2 turns in a row.", "imgURL", "attack", 4)
createCards("Skip", "Immediatley end your turn without drawing a card.", "imgURL", "skip", 4)
createCards("Favour", "Force any other player to give you 1 card from their hand. They choose which card to give you", "imgURL", "favour", 4)
createCards("Shuffle", "Shuffle the draw pile.", "imgURL", "shuffle", 4)
createCards("See the future", "Peek at the top 3 cards from the draw pile", "imgURL", "future", 5)

createCards("Taco Cat", "Junk", "imgURL", "junk", 4)
createCards("Watermelon Cat", "Junk", "imgURL", "junk", 4)
createCards("Poo Cat", "Junk", "imgURL", "junk", 4)
createCards("Beard Cat", "Junk", "imgURL", "junk", 4)
createCards("Rainbow Cat", "Junk","imgURL",  "junk", 4)


class Game:
    def __init__(self) -> None:
        self.gameId = random.randint(1, 10000)
        self.players = []
        self.deck = []
        self.currentPlayerTurnIndex = 0
        
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
        
        for i in range(len(playerNames) - 1):
            self.deck.append(Card("Exploding kitten", "Must play a defuse or loose the game!", "IMGURL", "kitten"))
        
        for i in range(6 - len(playerNames)):
            self.deck.append(Card("Defuse", "Defuses 1 exploding kitten", "imgURL", "defuse"))
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
                if cardType == "skip":
                    self.advanceTurn(1)
                if cardType == "favour": 
                    pass
                    print("Come back and do later")
                if cardType == "future": 
                    if len(self.deck) < 3:
                        for card in self.deck:
                            print(card.title)
                    else:
                        print(*(card.title for card in self.deck[:3]))

                if cardType == "shuffle":
                    random.shuffle(self.deck)
                if cardType == "junk":
                    print("Does nothing")
            else:
                print(f"Dont have in hand {cardType}")
                    
                
    def drawCard(self, player):
        print(f"{self.players[self.currentPlayerTurnIndex].userName} Drew a card")
        drawnCard = self.deck.pop()
        if drawnCard.cardType == "kitten":
            print("Drew exploding kitten")
            self.deck.append(Card("Exploding kitten", "Must play a defuse or loose the game!", "IMGURL", "kitten"))
            random.shuffle(self.deck)
        else:
            player.addCardToHand(drawnCard)
        
        #If the player is attacked then unmark as attacked and dont increment index
        if self.players[self.currentPlayerTurnIndex].attacked:
            self.players[self.currentPlayerTurnIndex].attacked = False
        else:
            self.advanceTurn(1)
            
            
            
    def advanceTurn(self, increment=1):
        if self.currentPlayerTurnIndex == len(self.players) - 1:
            self.currentPlayerTurnIndex = 0
        else:
            self.currentPlayerTurnIndex += 1
        print(f"{self.players[self.currentPlayerTurnIndex].userName} turn")
                    




"""game = Game()
game.startGame(["Alan", "Bob", "Casey", "Dylan", "Ellie"])

cards = []
for card in game.players[game.currentPlayerTurnIndex].hand:
        cards.append(card.title)
"""



#game.playCard(game.players[game.currentPlayerTurnIndex], "shuffle")

"""game.playCard(game.players[game.currentPlayerTurnIndex], "attack", 4)

game.drawCard(game.players[game.currentPlayerTurnIndex])
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.playCard(game.players[game.currentPlayerTurnIndex], "shuffle")

game.playCard(game.players[game.currentPlayerTurnIndex], "future")
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.playCard(game.players[game.currentPlayerTurnIndex], "skip")
game.drawCard(game.players[game.currentPlayerTurnIndex])
game.drawCard(game.players[game.currentPlayerTurnIndex])"""


"""cards = []
for card in game.players[game.currentPlayerTurnIndex].hand:
        cards.append(card.title)


game.drawCard(game.players[game.currentPlayerTurnIndex])


print("\n".join(card.title for card in game.deck))"""

"""for player in game.players:
    cards = []
    for card in player.hand:
        cards.append(card.title)
    print(cards)"""