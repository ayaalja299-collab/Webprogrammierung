import { Component, AfterViewInit } from '@angular/core';
import * as script from "../../scripts/home.js";

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  ngAfterViewInit() {
    script.initHome();
  }
}
