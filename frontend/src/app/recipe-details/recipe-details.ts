import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe, RecipesService } from '../services/recipes.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  imports: [NgClass],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
  standalone: true,
})
export class RecipeDetails implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly recipesService: RecipesService,
  ) {}

  ngOnInit() {
    const recipeId: number = this.route.snapshot.params["id"];

    this.recipesService.getRecipeById(recipeId).subscribe((recipe) => {
      this.recipe = recipe;
      this.cdr.markForCheck();
    });
  }
}
