import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imagePath: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private readonly backendUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    const url = this.backendUrl + "/recipes";

    return this.http.get<Recipe[]>(url);
  }

  getRecipeById(id: number): Observable<Recipe> {
    const url = this.backendUrl + "/recipes/" + id;

    return  this.http.get<Recipe>(url);
  }
}
