import {Component, Signal, signal} from '@angular/core';
import {isActive, Router, RouterOutlet} from '@angular/router';
import {Header} from './header/header';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  shouldBeScrollable: Signal<boolean>;

  constructor(private readonly router: Router) {
    this.shouldBeScrollable = isActive("/login", this.router, {
      paths: "subset",
      queryParams: "ignored",
      fragment: "ignored",
      matrixParams: "ignored"
    });
  }

}
