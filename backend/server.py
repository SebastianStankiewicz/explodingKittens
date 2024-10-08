from flask import Flask, request, session
from flask_socketio import SocketIO, send, join_room, emit
from flask_cors import CORS

from game import Game

import random
import string
app = Flask(__name__)

app.config['SECRET_KEY'] = 'secretkey!'

socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app, resources={r"/*": {"origins": "*"}})

activeGames = {}

@socketio.on('createRoom')
def create_game(data):
    if 'userName' in data:
        hostUserName = data['userName']
    else:
        send("Error: Username not provided.", to=request.sid)
        return
    if not hostUserName:
        send("Error: Username is required.", to=request.sid)
        return
    
    room = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    game = Game(room, int(data['numberOfPlayers']))
    #activeGames.append([game, []])
    activeGames[room] = (game, [])
    
    emit('game_created', {'roomCode': room})
    data = {"userName": data["userName"],
            "gameId": room}
    joinGame(data)


@socketio.on('joinGame')
def joinGame(data):
    if 'userName' in data and 'gameId' in data:
        userName = data['userName']
        gameId = data['gameId']
    else:
        send("Error: Username or gameId not provided.", to=request.sid)
        return
    if not userName:
        send("Error: Username is required.", to=request.sid)
        return
    join_room(gameId)  
    
    session['gameId'] = gameId
    session['userName'] = userName

    activeGames[gameId][1].append(userName)
    playersLeftToJoin = activeGames[gameId][0].numberOfPlayers - len(activeGames[gameId][1])
    emit('player_joined_game', {'playerUserNames': activeGames[gameId][1], 'playersLeftToJoin': playersLeftToJoin }, to=gameId)
    
    
    if playersLeftToJoin == 0:
        activeGames[gameId][0].startGame(activeGames[gameId][1])
        data = {}
        #For each player iterate through there starting hand
        for player in activeGames[gameId][0].players:
            data[player.userName] = ([])
            for card in player.hand:
                data[player.userName].append({'title': card.title,
                                      'description': card.description,
                                      'artWork': card.imageURl,
                                      'cardType': card.cardType})
        #emit('starting_hand_cards', data, to=gameId)
        emit('start_game', data, to=gameId)
        
@socketio.on('drawCard')
def drawCardSOCKETCALL(data):
    gameId = session.get('gameId')  
    userName = session.get('userName')
    game = activeGames[gameId][0]
    if game.checkIfPlayersTurn(userName):
        #Implement an appropriate emition to the client to then update there screen with new card.
        #Peform logic check. If expliding kitten emit to room otherwise just to request SID and emit new player notification
        card = game.drawCard()
        if card.cardType != 'kitten':
            emit('add_card_to_hand', {'title': card.title,
                                      'description': card.description,
                                      'artWork': card.imageURl,
                                      'cardType': card.cardType}, to=request.sid)
            
        else:
            print("exploading kitten. Deal with this later")
        
    else:
        print("Not allowed to draw card (not your turn)")
        

@socketio.on ('playCard')
def playCardSOCKETCALL(data):
    gameId = session.get('gameId')  
    userName = session.get('userName')
    playedCard = data["cardType"]
    game = activeGames[gameId][0]
    
    if game.checkIfPlayersTurn(userName):
        for player in game.players:
            if player.userName == userName:
                try:
                    uniqueEffect = game.playCard(player, playedCard)
                except:
                    print(data["cardType"] + " broke it")
                emit('player_played_card', data, room=gameId, skip_sid=request.sid)
        


if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=5001, debug=True, ) #Replace with your server url