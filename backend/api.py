from flask import Flask, request, jsonify, session
from flask_cors import CORS

from game import Game



app = Flask(__name__)

app.config['SECRET_KEY'] = 'supersecretkey'
CORS(app)


#Will store all the active game objects in this list.
activeGames = []


@app.route('/createGameRoom', methods=['POST'])
def createGameRoom():
    try:
        game = Game()
        activeGames.append([game, []])
          
        return jsonify({'success': True,
                        'gameId': game.gameId})


    except Exception as e:
        return jsonify({'success': False,
                        'message': str(e)})

@app.route('/joinGameRoom', methods=['POST'])
def joinGameRoom():
    try:
        gameId = request.json['gameId']
        userName = request.json['userName']
        
        for roomPair in activeGames:
            if roomPair[0].gameId == gameId:
                roomPair[1].append(userName)
                
        return jsonify({'success': True})

    except Exception as e:
        return jsonify({'success': False,
                        'message': str(e)})
        
@app.route('/startGame', methods=['POST'])
def startGame():
    try:
        gameId = request.json['gameId']
        
        for roomPair in activeGames:
            if roomPair[0].gameId == gameId:
                roomPair[0].startGame(roomPair[1])
                
        return jsonify({'success': True,
                        'deck': ("\n".join(card.title for card in roomPair[0].deck))})

    except Exception as e:
        return jsonify({'success': False,
                        'message': str(e)})
        

@app.route('/getGameRoomUserNames', methods=['POST'])
def getGameRoomUserNames():
    try:
        gameId = request.json['gameId']
        
        for roomPair in activeGames:
            if roomPair[0].gameId == gameId:
                return jsonify({'success': True,
                                'userNames': roomPair[1]})

    except Exception as e:
        return jsonify({'success': False,
                        'message': str(e)})
        
        
#ALL GAME ROUTES MUST BE SWAPPED FOR WEB SOCKETS!!!!!
@app.route('/game/drawNewCard', methods=['POST'])
def drawNewCard():
    try:
        gameId = request.json['gameId']
        userName = request.json['userName']
        
        for roomPair in activeGames:
            if roomPair[0].gameId == gameId:
                if userName in roomPair[1]:
                    game = roomPair[0]
                    for player in game.players:
                        if player.userName == userName:
                            drawnCard = game.drawCard(player)
                            return jsonify({
                            'title': drawnCard.title,
                            'description': drawnCard.description,
                            'artWork': drawnCard.imageURl,
                            'cardType': drawnCard.cardType})
                        
                    #Player found in specified game.
        return jsonify({'success': False,
                        'message': str(e)})
                    

    except Exception as e:
        return jsonify({'success': False,
                        'message': str(e)})
        

@app.route('/game/playCard', methods=['POST'])
def playCard():
    try:
        gameId = request.json['gameId']
        userName = request.json['userName']
        cardType = request.json['cardType']
        
        targetPlayer = request.json['targetPlayer'] #For favour or nope cards
        
        for roomPair in activeGames:
            if roomPair[0].gameId == gameId:
                if userName in roomPair[1]:
                    game = roomPair[0]
                    for player in game.players:
                        if player.userName == userName:
                            playCard = game.playCard(player, cardType, targetPlayer)
                            return jsonify({
                            'success': True,
                            'data': playCard
                            })
                        
                    #Player found in specified game.
        return jsonify({'success': False,
                        'message': str(e)})
                    

    except Exception as e:
        return jsonify({'success': False,
                        'message': str(e)})



    



if __name__ == '__main__':
    app.run(debug=True)