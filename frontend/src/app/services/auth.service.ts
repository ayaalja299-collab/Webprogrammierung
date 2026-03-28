import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface ActiveUser {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly backendUrl = "http://localhost:3000";

  private readonly activeUserSubject
    = new BehaviorSubject<ActiveUser | undefined>(this.loadUser());

  public readonly activeUser$: Observable<ActiveUser | undefined>;

  constructor(
    private readonly http: HttpClient
  ) {
    this.activeUser$ = this.activeUserSubject.asObservable();
  }

  login(username: string, password: string) {
    const url = this.backendUrl + "/auth/login";
    return this.http.post<ActiveUser>(url, {username, password}).pipe(
      tap(user => {
        this.activeUserSubject.next(user);
        sessionStorage.setItem("activeUser", JSON.stringify(user));
      })
    );
  }

  register(username: string, email: string, password: string) {
    const url = this.backendUrl + "/auth/register";
    return this.http.post<ActiveUser>(url, {username, email, password});
  }

  logout(): void {
    sessionStorage.removeItem("activeUser");
    this.activeUserSubject.next(undefined);
  }

  private loadUser(): ActiveUser | undefined {
    const raw = sessionStorage.getItem("activeUser");
    return raw ? JSON.parse(raw) as ActiveUser : undefined;
  }
}
