import { Component, OnInit } from '@angular/core';
import * as recipes from "../../scripts/recipes";

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes implements OnInit {
  async ngOnInit() {
    await recipes.initRecipes();
  }
}
