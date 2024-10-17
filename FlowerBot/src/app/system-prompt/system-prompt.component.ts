import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SystemPromptService } from '../system-prompt.service';

@Component({
  selector: 'app-system-prompt',
  standalone: true,
  imports: [],
  templateUrl: './system-prompt.component.html',
  styleUrl: './system-prompt.component.css'
})
export class SystemPromptComponent {

  private systemPromptService = inject(SystemPromptService);
  private router = inject(Router);
  selectedPrompt: string = 'default';
  systemPrompt: string = this.systemPromptService.systemPrompt();
  isDefaultPrompt: boolean = true;

  updatePrompt(newPromptType: string): void {
    this.isDefaultPrompt = !newPromptType || newPromptType === 'default';
    this.systemPrompt = this.isDefaultPrompt
      ? this.systemPromptService.defaultPrompt
      : newPromptType;
    this.selectedPrompt = this.isDefaultPrompt ? 'default' : newPromptType;
  }

  updateCustomPrompt(): void {
    console.log(this.systemPrompt);
    this.systemPromptService.updatePrompt(this.systemPrompt);
  }

  navigateToAnswerQuestion(): void {
    this.updateCustomPrompt();
    this.router.navigate(['/answerQuestion']);
  }
}
