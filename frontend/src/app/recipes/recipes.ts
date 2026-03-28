import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Recipe, RecipesService } from '../services/recipes.service';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipes',
  imports: [RecipeCard],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
  standalone: true,
})
export class Recipes implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly recipesService: RecipesService
  ) {

  }

  async ngOnInit() {
    this.recipesService.getRecipes().subscribe((recipes) => {
      recipes.forEach((recipe) => {
        if (!recipe.imagePath) {
          recipe.imagePath = "assets/placeholder.png";
        }
        this.recipes.push(recipe);
      });
      this.cdr.detectChanges(); // refresh Template
    });
  }
}
