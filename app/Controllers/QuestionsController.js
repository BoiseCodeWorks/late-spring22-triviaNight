import { ProxyState } from "../AppState.js";
import { questionsService } from "../Services/QuestionsService.js";
import { Pop } from "../Utils/Pop.js";

function _draw(){
  let question = ProxyState.question
  document.getElementById('question').innerHTML = question.Template
}

function _enableButtons(){

  let hasPlayer = ProxyState.activePlayer.id
  let hasQuestion = ProxyState.question.correct
  if( hasPlayer && hasQuestion){
    document.getElementById('correct-button').disabled = false
    document.getElementById('incorrect-button').disabled = false
  }
}

export class QuestionsController{
  constructor(){
    console.log('questoins loaded');
    ProxyState.on('question', _draw)
    ProxyState.on('question', _enableButtons)
    ProxyState.on('activePlayer', _enableButtons)
  }

  async getQuestion(){
    try {
        await questionsService.getQuestion()
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }
}