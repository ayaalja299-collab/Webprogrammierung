import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = "";
  password = "";

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      () => this.router.navigateByUrl('')
    );
  }
}
