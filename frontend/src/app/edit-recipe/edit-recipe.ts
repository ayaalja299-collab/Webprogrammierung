import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-recipe',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './edit-recipe.html',
  styleUrls: ['./edit-recipe.css', '../../shared/styles/form-common.css'],
})
export class EditRecipe implements OnInit {
  name = '';
  description = '';
  ingredients = '';
  instructions = '';
  imagePath: string | undefined;

  recipeId: number | undefined;

  errorMessageSubject = new BehaviorSubject<string | undefined>(undefined);
  errorMessage$: Observable<string | undefined> = this.errorMessageSubject.asObservable();

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly recipesService: RecipesService,
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.params['id'];

    this.recipesService.getRecipeById(this.recipeId!).subscribe((recipe) => {
      this.name = recipe.name;
      this.description = recipe.description;
      this.ingredients = recipe.ingredients.join(', ');
      this.instructions = recipe.instructions;
      this.imagePath = recipe.imagePath;

      this.cdr.markForCheck();
    });
  }

  onSubmit() {
    this.recipesService.editRecipe(
      this.recipeId!,
      this.name,
      this.description,
      this.ingredients.split(",").map(r => r.trim()),
      this.instructions,
      this.imagePath
    ).subscribe({
      next: () => this.router.navigateByUrl("/recipe-details/" + this.recipeId!),
      error: err => {
        if (err instanceof HttpErrorResponse) {
          this.errorMessageSubject.next(err.error);
        }
      }
    });
  }

  delete() {
    this.recipesService.deleteRecipe(this.recipeId!).subscribe({
      next: () => this.router.navigateByUrl("/recipes"),
      error: err => {
        if (err instanceof HttpErrorResponse) {
          this.errorMessageSubject.next(err.error);
        }
      }
    });
  }
}
