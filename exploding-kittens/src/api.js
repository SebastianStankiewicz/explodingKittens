const apiUrl = 'http://127.0.0.1:5000';



export const drawNewCardAPI = async (userName, gameId) => {
    const response = await fetch(apiUrl + '/game/drawNewCard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, gameId })
    });
    return response.json();
  };