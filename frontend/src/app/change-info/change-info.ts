import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-change-info',
  imports: [
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './change-info.html',
  styleUrls: ['./change-info.css', '../../shared/styles/form-common.css'],
})
export class ChangeInfo {
  password = "";
  newUsername: string | undefined;
  newEmail: string | undefined;
  newPassword: string | undefined;

  errorMessageSubject = new BehaviorSubject<string | undefined>(undefined);
  errorMessage$: Observable<string | undefined> = this.errorMessageSubject.asObservable();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) { }

  onSubmit() {
    if (this.newUsername === "") this.newUsername = undefined;
    if (this.newEmail === "") this.newEmail = undefined;
    if (this.newPassword === "") this.newPassword = undefined;

    if (!this.newPassword && !this.newUsername && !this.newEmail) {
      this.errorMessageSubject.next("There are no changes");
      return;
    }
    this.authService.changeAccountInfo(this.password, this.newUsername, this.newEmail, this.newPassword)
      .subscribe({
        next: () => this.router.navigate(["/login"]),
        error: err => {
          if (err instanceof HttpErrorResponse) {
            this.errorMessageSubject.next(err.error);
          }
        }
      });
  }
}
