import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {RecipesService} from '../services/recipes.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-recipe',
  imports: [
    FormsModule
  ],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.css',
})
export class CreateRecipe {
  name = "";
  description = "";
  ingredients = "";
  instructions = "";
  imagePath: string | undefined;

  constructor(
    private readonly router: Router,
    private readonly recipesService: RecipesService
  ) { }

  onSubmit() {
    this.recipesService.createRecipe(
      this.name,
      this.description,
      this.ingredients.split(",").map(ingredient => ingredient.trim()),
      this.instructions,
      this.imagePath
    ).subscribe(() => this.router.navigate(['/']));
  }
}
