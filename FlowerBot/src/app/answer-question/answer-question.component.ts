import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../open-ai.service';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [FormsModule, MarkdownModule, CommonModule],
  templateUrl: './answer-question.component.html',
  styleUrl: './answer-question.component.css'
})
export class AnswerQuestionComponent {
  question = signal('');
  conversationHistory = signal<{ role: string, content: string }[]>([]);
  maxTurns = 20;

  private readonly openAiService = inject(OpenAIService);

  get turnCount(): number {
    return Math.floor(this.conversationHistory().length / 2);
  }
  async answerQuestion(event: Event): Promise<void> {
    event.preventDefault();

    const userMessage = this.question().trim();
    const systemPrompt = localStorage.getItem('systemPrompt') || 'You are a helpful assistant.';

    if (userMessage) {
      this.conversationHistory.update(history => [...history, { role: 'user', content: userMessage }]);
      this.question.set('');

      try {
        const response = await this.openAiService.answerQuestions(userMessage, systemPrompt);
        const botMessage = response.choices[0].message.content;

        this.conversationHistory.update(history => [...history, { role: 'bot', content: botMessage }]);
      } catch (error) {
        console.error('Error fetching OpenAI response:', error);
      }
    }
  }

  startOver(): void {
    this.conversationHistory.set([]);

    this.question.set('');
    
  }
}
