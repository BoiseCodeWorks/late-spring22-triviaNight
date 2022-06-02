import { ProxyState } from "../AppState.js";
import { Question } from "../Models/Question.js";

const triviaApi = axios.create({
  baseURL : 'https://opentdb.com/api.php?amount=1'
})

class QuestionsService{
  async getQuestion() {
    const res = await triviaApi.get('')
    console.log('getQuestoin', res.data);
    // NOTE why it is important to log the res, each api returns data differently so this next line changes often
    ProxyState.question = new Question(res.data.results[0])
    console.log(ProxyState.question);
  }

}

export const questionsService = new QuestionsService()