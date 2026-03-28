import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = "";
  email = "";
  password = "";

  errorMessageSubject = new BehaviorSubject<string | undefined>(undefined);
  errorMessage$: Observable<string | undefined> = this.errorMessageSubject.asObservable();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  onSubmit() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => this.router.navigateByUrl("/login"),
      error: err => {
        if (err instanceof HttpErrorResponse) {
          this.errorMessageSubject.next(err.error);
        }
      }
    });
  }
}
