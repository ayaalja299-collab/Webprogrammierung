import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Recipe, RecipesService } from '../services/recipes.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  imports: [NgClass, RouterLink],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
  standalone: true,
})
export class RecipeDetails implements OnInit {
  recipe: Recipe | undefined;
  isFavorite: boolean | undefined = undefined;

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

      this.recipesService.isRecipeFavorited(recipeId).subscribe(isFavorite => {
        this.isFavorite = isFavorite;
        this.cdr.markForCheck();
      });
    });
  }

  switchFavoriteState() {
    this.recipesService.switchFavoriteStateOfRecipe(this.recipe!.id)
      .subscribe(() => {
        this.recipesService.isRecipeFavorited(this.recipe!.id).subscribe(isFavorite => {
          this.isFavorite = isFavorite;
          this.cdr.markForCheck();
        });
      });
  }
}
