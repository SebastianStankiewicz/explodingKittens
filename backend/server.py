from flask import Flask, request
from flask_socketio import SocketIO, send, join_room, emit
from flask_cors import CORS

from game import Game

import random
import string
app = Flask(__name__)

app.config['SECRET_KEY'] = 'secretkey!'

socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app, resources={r"/*": {"origins": "*"}})

activeGames = []

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
    #join_room(room)
    game = Game(room)
    activeGames.append([game, []])
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
    
    for roomPair in activeGames:
            if roomPair[0].gameId == gameId:
                roomPair[1].append(userName)
    
    join_room(gameId)            
    emit('player_joined_game', {'playerUserNames': roomPair[1]}, to=gameId)
    
    





if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=5001, debug=True, ) #Replace with your server url