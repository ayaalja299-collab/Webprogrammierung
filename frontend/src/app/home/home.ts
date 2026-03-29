import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import * as script from "../../scripts/home.js";
import {RecipeCard} from '../recipe-card/recipe-card';
import {RouterLink} from '@angular/router';
import { Recipe, RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-home',
  imports: [RecipeCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home implements OnInit {
  private readonly TODAYS_RECIPE_IDS = [1, 3, 10];
  private readonly POPULAR_RECIPES_IDS = [1, 3, 10, 4];

  todaysRecipes: Recipe[] = [];
  popularRecipes: Recipe[] = [];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.recipesService.getRecipesByIds(this.TODAYS_RECIPE_IDS)
      .subscribe((recipes) => {
        this.todaysRecipes = recipes;
        this.cdr.detectChanges();
        script.initHome();
      });

    this.recipesService.getRecipesByIds(this.POPULAR_RECIPES_IDS)
      .subscribe((recipes) => {
        this.popularRecipes = recipes
        this.cdr.markForCheck();
      });
  }
}
