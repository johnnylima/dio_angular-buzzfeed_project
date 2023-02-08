import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


  quizTitle:string = ''
  questoes:any
  questaoSelecionada:any

  respostas:string[]=[]
  respostaSelecionada:string=""

  perguntaIndex:number=0
  perguntaMaxIndex:number=0

  fim:boolean = false

  ngOnInit(): void {
    // console.log('quizz', quizz_questions.title);

    this.fim = false

    this.quizTitle = quizz_questions.title;

    this.perguntaIndex = 0

    this.questoes = quizz_questions.questions
    this.questaoSelecionada = this.questoes[this.perguntaIndex]

    this.perguntaMaxIndex = this.questoes.length

  }

  escolha(value:string){
    this.respostas.push(value)
    this.proximaQuestao()
    }

    async proximaQuestao(){
      this.perguntaIndex+=1
      if(this.perguntaMaxIndex > this.perguntaIndex) this.questaoSelecionada = this.questoes[this.perguntaIndex]
      else{
        const respostaFinal:string = await this.chegarGanhador(this.respostas)
        this.fim=true
        this.respostaSelecionada = quizz_questions.results[respostaFinal as keyof typeof quizz_questions.results]
        //verficar ganhador
        console.log(this.respostas);

      }
    }

    async chegarGanhador(respostas:string[]){
      const result = respostas.reduce((p,c,i,arr)=>{
        if (arr.filter(item => item === p ).length > arr.filter(item => item === c ).length ) return p
        else return c
      })
      return result
    }



}
