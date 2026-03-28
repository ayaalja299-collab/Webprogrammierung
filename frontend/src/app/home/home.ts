import { Component, AfterViewInit } from '@angular/core';
import * as script from "../../scripts/home.js";
import {RecipeCard} from '../recipe-card/recipe-card';

@Component({
  selector: 'app-home',
  imports: [RecipeCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home implements AfterViewInit {

  ngAfterViewInit() {
    script.initHome();
  }
  
}
