import {Component, computed, Signal, signal} from '@angular/core';
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
    const matchOptions = {
      paths: "subset",
      queryParams: "ignored",
      fragment: "ignored",
      matrixParams: "ignored"
    } as const;

    this.shouldBeScrollable = computed(() =>
      isActive("/register", this.router, matchOptions)()
      || isActive("/login", this.router, matchOptions)()
    );
  }

}
