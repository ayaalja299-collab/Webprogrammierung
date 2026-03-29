import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActiveUser, AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Recipe, RecipesService} from '../services/recipes.service';
import {RecipeCard} from '../recipe-card/recipe-card';

@Component({
  selector: 'app-profile',
  imports: [
    AsyncPipe,
    RouterLink,
    RecipeCard
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  favorites: Recipe[] = [];

  activeUser$: Observable<ActiveUser | undefined>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly recipesService: RecipesService
  ) {
    this.activeUser$ = authService.activeUser$;
    this.activeUser$.subscribe(activeUser => {
      if (!activeUser) {
        router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.recipesService.getFavorites().subscribe(
      favorites => {
        this.favorites = favorites;
        this.cdr.detectChanges(); // refresh Template
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
