import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
  standalone: true,
})
export class RecipeCard {
  imageSource = input<string>('');
  altText = input();
  title = input();
  description = input();
  id = input();
}
