import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = "";
  password = "";
  // TODO: check inputs and give Feedback

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
