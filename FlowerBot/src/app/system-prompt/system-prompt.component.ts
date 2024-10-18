import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SystemPromptService } from '../system-prompt.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-system-prompt',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './system-prompt.component.html',
  styleUrl: './system-prompt.component.css'
})
export class SystemPromptComponent {

  systemPrompt = signal(localStorage.getItem('systemPrompt') || '');

  saveSystemPrompt() {
    localStorage.setItem('systemPrompt', this.systemPrompt());
  }
}
