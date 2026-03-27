import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Recipes} from './recipes/recipes';
import {RecipeDetails} from './recipe-details/recipe-details'

export const routes: Routes = [
  {
    path: "",
    component: Home,
    title: "FOOD"
  },
  {
    path: "recipes",
    component: Recipes,
    title: "Recipes"
  },
  {
    path: "recipe-details/:id",
    component: RecipeDetails
  }
];
