from card import Card
class Player:
    def __init__(self, userName: str, playerNumber: int, startingHand: list) -> None:
        self.userName = userName
        self.playerNumber = playerNumber
        self.hand = startingHand #A list of card objects.
        self.attacked = False #To check if an extra turn is required.
        
        self.hand.append(Card("Defuse", "Defuses 1 exploding kitten", "imgURL", "defuse"))

    def checkIfCardTypeInHand(self, cardType:str) -> bool:
        for card in self.hand:
            if card.cardType == cardType:
                return True
        return False

    def removeCardFromHand(self, cardType):
        for index, card in enumerate(self.hand):
            if card.cardType == cardType:
                return self.hand.pop(index)
        return None 
    
    def addCardToHand(self, card):
        self.hand.append(card)