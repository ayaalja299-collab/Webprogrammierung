import { Component, input } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [
    RouterLink
  ],
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
