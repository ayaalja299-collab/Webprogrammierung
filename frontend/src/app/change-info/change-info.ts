import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-change-info',
  imports: [
    FormsModule
  ],
  templateUrl: './change-info.html',
  styleUrl: './change-info.css',
})
export class ChangeInfo {
  password = "";
  newUsername: string | undefined;
  newEmail: string | undefined;
  newPassword: string | undefined;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) { }

  onSubmit() {
    if (this.newUsername === "") this.newUsername = undefined;
    if (this.newEmail === "") this.newEmail = undefined;
    if (this.newPassword === "") this.newPassword = undefined;

    if (!this.newPassword && !this.newUsername && !this.newEmail) {
      // TODO Handle this!
      console.error("if-path not implemented");
    }
    this.authService.changeAccountInfo(this.password, this.newUsername, this.newEmail, this.newPassword)
      .subscribe(() => {
        this.router.navigate(["/"]);
      })
  }
}
