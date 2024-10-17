import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemPromptService {
  defaultPrompt = `
  - Rose: red, yellow, purple
  - Lily: yellow, pink, white
  - Gerbera: pink, red, yellow
  - Freesia: white, pink, red, yellow
  - Tulips: red, yellow, purple
  - Sunflowers: yellow

  The pricing for bouquets is:
  - Small bouquet: 15€ (3 flowers with greenery)
  - Medium bouquet: 25€ (5 flowers with more greenery)
  - Large bouquet: 35€ (10 flowers with greenery and filler flowers)

  Be friendly and helpful to the customer. When they don't say anything about flowers or bouquets don't response`;

  systemPrompt = signal(this.defaultPrompt);

  updatePrompt(newPrompt: string) {
    this.systemPrompt.set(newPrompt);
  }

  getPrompt() {
    return this.systemPrompt();
  }
}
