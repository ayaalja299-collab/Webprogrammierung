import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable, switchMap, take, tap, throwError} from 'rxjs';
import {AuthService} from './auth.service';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imagePath?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private readonly backendUrl = "http://localhost:3000";

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) { }

  getRecipes(): Observable<Recipe[]> {
    const url = this.backendUrl + "/recipes";

    return this.http.get<Recipe[]>(url);
  }

  getRecipeById(id: number): Observable<Recipe> {
    const url = this.backendUrl + "/recipes/" + id;

    return  this.http.get<Recipe>(url);
  }

  getRecipesByIds(ids: number[]): Observable<Recipe[]> {
    const url = this.backendUrl + "/many-recipes";

    const params = new HttpParams().set("ids", ids.join(","));
    return this.http.get<Recipe[]>(url, { params });
  }

  createRecipe(
    name: string,
    description: string,
    ingredients: string[],
    instructions: string,
    imagePath?: string
  ): Observable<void> {
    const url = this.backendUrl + "/recipes/create";

    return this.authService.activeUser$.pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error("No user logged in"));
        }
        if (!user.isAdmin) {
          return throwError(() => new Error("User does not have privileges"));
        }

        return this.http.post<void>(url, {name, description, ingredients, instructions, imagePath});
      })
    );
  }

  editRecipe(
    id: number,
    name: string,
    description: string,
    ingredients: string[],
    instructions: string,
    imagePath?: string
  ): Observable<void> {
    const url = this.backendUrl + "/recipes/edit";

    return this.authService.activeUser$.pipe(
      switchMap((user) => {
        if (!user) {
          return throwError(() => new Error('No user logged in'));
        }
        if (!user.isAdmin) {
          return throwError(() => new Error("User does not have privileges"));
        }

        return this.http.post<void>(url, {id, name, description, ingredients, instructions, imagePath});
      }),
    );
  }

  deleteRecipe(
    id: number
  ): Observable<void> {
    const url = this.backendUrl + "/recipes/delete";

    return this.authService.activeUser$.pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error('No user logged in'));
        }
        if (!user.isAdmin) {
          return throwError(() => new Error("User does not have privileges"));
        }

        return this.http.post<void>(url, {id});
      })
    )
  }

  getFavorites(): Observable<Recipe[]> {
    const favoriteUrl = this.backendUrl + '/favorites';
    const manyRecipesUrl = this.backendUrl + '/many-recipes';

    return this.authService.activeUser$.pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error("No user logged in"));
        }

        return this.http.get<number[]>(`${favoriteUrl}/${user.id}`).pipe(
          switchMap(ids => {
            const params = new HttpParams().set("ids", ids.join(","));
            return this.http.get<Recipe[]>(manyRecipesUrl, { params });
          })
        );
      })
    );
  }

  isRecipeFavorited(recipeId: number): Observable<boolean> {
    const url = this.backendUrl + "/favorites";

    return this.authService.activeUser$.pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error("No user logged in"));
        }

        return this.http.get<number[]>(`${url}/${user.id}`).pipe(
            map(ids =>  !!ids.find(id => id === +recipeId))
        );
      })
    );
  }

  switchFavoriteStateOfRecipe(recipeId: number): Observable<void> {
    const url = this.backendUrl + "/switch-favorites/" + recipeId;

    return this.authService.activeUser$.pipe(
      switchMap(user => {
        if(!user) {
          return throwError(() => new Error("No user logged in"));
        }

        return this.http.post<void>(url, {id: user.id});
      })
    );
  }
}
