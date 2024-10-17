import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../open-ai.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [FormsModule, MarkdownModule],
  templateUrl: './answer-question.component.html',
  styleUrl: './answer-question.component.css'
})
export class AnswerQuestionComponent {
  question = signal('');
  conversation = signal<string[]>([]);

  private readonly openAIService = inject(OpenAIService);

  async answerQuestion() {
    console.log(this.openAIService.systemPrompt);
    await this.openAIService.answerQuestions(this.question());
    this.conversation.set(this.openAIService.conversation);
  }

  startOver() {
    this.openAIService.conversation = [];
    this.conversation.set([]);
  }
}