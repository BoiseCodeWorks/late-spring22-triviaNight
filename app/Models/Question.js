

export class Question{
  constructor(data){
    this.category = data.category
    this.difficulty = data.difficulty
    this.question = data.question
    this.correct = data.correct_answer
    this.incorrect = data.incorrect_answers
    // NOTE calculate and create a point value based on original data
    this.points = this.calculatePoints(data.difficulty)
  }

  calculatePoints(difficulty){
    switch(difficulty){
      case 'easy': return 100
      case 'medium' : return 150
      case 'hard' : return 200
    }
  }

  get Template(){
    return `
      <h3 class="col-6 p-2 ">${this.category}</h3>
      <h4 class="col-6 p-2 text-end">${this.points}</h4>
      <p class="col-12 bg-light p-4">
      ${this.question}
      </p>

      ${this.Answers}

      <div class="col-12 bg-black text-center p-5 my-3 "><span class="on-hover text-light">${this.correct}</span></div>
    `
  }

  get Answers(){
    let all = [...this.incorrect, this.correct]
    // NOTE this just jumbles the array
    for(let i = 0; i < 5; i++){
      all = all.sort(()=> Math.random() - .5)
    }
    let template = ''
      all.forEach(a => template += `<div class="col-5 border border-dark text-center px-3 py-2 my-2">${a}</div>`)
      return template
  }
}