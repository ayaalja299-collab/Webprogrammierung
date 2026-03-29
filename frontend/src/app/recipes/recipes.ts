import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Recipe, RecipesService } from '../services/recipes.service';
import { RecipeCard } from '../recipe-card/recipe-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  imports: [RecipeCard, FormsModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
  standalone: true,
})
export class Recipes implements OnInit {
  allRecipes: Recipe[] = [];
  recipes: Recipe[] = [];

  searchField: string = '';
  sortOrder: string = 'id-asc';

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly recipesService: RecipesService,
  ) {}

  async ngOnInit() {
    this.recipesService.getRecipes().subscribe((recipes) => {
      recipes.forEach((recipe) => {
        if (!recipe.imagePath) {
          recipe.imagePath = 'assets/placeholder.png';
        }
        this.allRecipes.push(recipe);
      });
      this.search();
      this.cdr.detectChanges(); // refresh Template
    });
  }

  search() {
    this.recipes = this.allRecipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(this.searchField.toLowerCase()) ||
        recipe.description.toLowerCase().includes(this.searchField.toLowerCase())
      );
    });
    this.sort();
  }

  sort() {
    this.recipes.sort((r1, r2) => {
      switch (this.sortOrder) {
        case "id-desc":
          return r2.id - r1.id;
        case "id-asc":
          return r1.id - r2.id;
        case "name-desc":
          if (r1.name === r2.name) return -1;
          return r2.name.localeCompare(r1.name);
        case "name-asc":
        default:
          console.log("default");
          if (r1.name === r2.name) return -1;
          return r1.name.localeCompare(r2.name);
      }
    });
  }
}
