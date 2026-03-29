import {ChangeDetectorRef, Component} from '@angular/core';
import {Recipe, RecipesService} from '../services/recipes.service';
import {RecipeCard} from '../recipe-card/recipe-card';

@Component({
  selector: 'app-favorites',
  imports: [
    RecipeCard
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  favorites: Recipe[] = [];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly recipesService: RecipesService
  ) { }

  async ngOnInit() {
    this.recipesService.getFavorites().subscribe(recipes => {
      recipes.forEach(recipe => {
        this.favorites.push(recipe);
      });
      this.cdr.detectChanges(); // refresh Template
    });
  }
}
