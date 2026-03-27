import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as script from "../../scripts/recipe-details.js";

@Component({
  selector: 'app-recipe-details',
  imports: [],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  async ngOnInit() {
    console.log(this.activatedRoute);
    await script.initDetails();
  }
}
