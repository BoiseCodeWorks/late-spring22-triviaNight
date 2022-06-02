

export class Player{
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.points = data.points
    this.questions = data.questions
    this.correct = data.correct
    this.incorrect = data.incorrect
  }

  get Template(){
    return `
  <div class="d-flex justify-content-between py-2 px-3 selectable" 
  onclick="app.playersController.setActivePlayer('${this.id}')">
    <b class="text-primary">${this.name}</b>
    <span class="${this.points >= 0 ? 'text-warning': 'text-danger'}">${this.points}</span>
  </div>
    `
  }

  get ActiveTemplate(){
    return `
    <div class="d-flex flex-column justify-content-between py-2 px-3 >
      <h3 class="text-dark">${this.name}</h3>
      <span class="text-warning bg-dark p-2">${this.points}</span>
    </div>
    `
  }

  // NOTE alternative to the ternary on line 18, you could just call this.PointColor
  get PointColor(){
    if(this.points>= 0){
      return 'text-warning'
    } else{
      return 'text-danger'
    }
  }
}