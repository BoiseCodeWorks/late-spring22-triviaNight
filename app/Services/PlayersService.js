import { ProxyState } from '../AppState.js';
import { Player } from '../Models/Player.js';


let sandboxApi = axios.create({
  // NOTE leaving the baseURL open lets our axios create be more flexible
  baseURL: 'https://bcw-sandbox.herokuapp.com/api',
  timeout: 12000
})

class PlayersService{
  async getPlayers() {
    // NOTE the string in the 'get' here appends 'players' to the end of the baseURL
    const res = await sandboxApi.get('players')
    console.log('getPlayers', res.data);
    // NOTE iterates over array and performs and action on each item within, then returns the resulting array.
    ProxyState.players = res.data.map(p => new Player(p))
    console.log(ProxyState.players, res.data);
  }
  async createPlayer(playerData) {
    const res = await sandboxApi.post('players', playerData)
    console.log('createPlayer', res.data);
    ProxyState.players = [...ProxyState.players, new Player(res.data)]
  }
  setActivePlayer(id) {
    // NOTE find the player you clicked on
    let player = ProxyState.players.find(p => p.id == id)
    console.log('setActivePlayer', player);
    // NOTE set them as the active player
    ProxyState.activePlayer = player
  }
  async updatePlayer(correct) {
    // NOTE getting the player and points
    let player = ProxyState.activePlayer
    let points = ProxyState.question.points
    // NOTE updating the players stats
    player.points += correct ? points : -points
    player.questions++
    player.correct += correct ? 1 : 0
    player.incorrect += correct ? 0 : 1
    const res = await sandboxApi.put(`players/${player.id}`, player)
    console.log('updatePlayer', res.data);
    // NOTE trick listeners to re-draw
    ProxyState.activePlayer = ProxyState.activePlayer
    ProxyState.players = ProxyState.players
  }

}

export const playersService = new PlayersService()