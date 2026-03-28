import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = "";
  email = "";
  password = "";
  // TODO: check inputs and give feedback

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  onSubmit() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      () => this.router.navigateByUrl("/login")
    );
  }
}
