import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {RecipesService} from '../services/recipes.service';
import {FormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-create-recipe',
  imports: [
    FormsModule,
    AsyncPipe
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

  errorMessageSubject = new BehaviorSubject<string | undefined>(undefined);
  errorMessage$: Observable<string | undefined> = this.errorMessageSubject.asObservable();

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
    ).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => {
        if (err instanceof HttpErrorResponse) {
          this.errorMessageSubject.next(err.error);
        }
      }
    });
  }
}
