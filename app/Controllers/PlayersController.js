import { ProxyState } from "../AppState.js";
import { playersService } from "../Services/PlayersService.js";
import { Pop } from "../Utils/Pop.js";

function _draw(){
  let players = ProxyState.players.sort((a,b) => b.points-a.points)
  let template = ''
  players.forEach(p => template += p.Template)
  document.getElementById('players-list').innerHTML = template
}

function _drawActivePlayer(){
  let player = ProxyState.activePlayer
  document.getElementById('active-player').innerHTML = player.ActiveTemplate
}


export class PlayersController{
  constructor(){
    console.log('loaded Players');
    // REVIEW
    ProxyState.on('players', _draw)
    ProxyState.on('activePlayer', _drawActivePlayer)
    this.getPlayers()
  }


  async getPlayers(){
    try {
      await playersService.getPlayers()
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }

  async createPlayer(){
    try {
      window.event.preventDefault()
      console.log('creating player');
      let form = window.event.target
      let playerData = {
        name: form.name.value
      }
      await playersService.createPlayer(playerData)
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }

  setActivePlayer(id){
    playersService.setActivePlayer(id)
  }

  async updatePlayer(correct){
    try {
      playersService.updatePlayer(correct)
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }
}