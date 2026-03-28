import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Recipes} from './recipes/recipes';
import {RecipeDetails} from './recipe-details/recipe-details'
import {Login} from './login/login';
import {Profile} from './profile/profile';
import {Register} from './register/register';
import {ChangeInfo} from './change-info/change-info';
import {Favorites} from './favorites/favorites';

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
  },
  {
    path: "login",
    component: Login
  },
  {
    path: "register",
    component: Register
  },
  {
    path: "profile",
    component: Profile
  },
  {
    path: "change-profile",
    component: ChangeInfo
  },
  {
    path: "favorites",
    component: Favorites
  }
];
