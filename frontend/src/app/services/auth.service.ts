import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface ActiveUser {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly backendUrl = "http://localhost:3000";

  private readonly activeUserSubject = new BehaviorSubject<ActiveUser | undefined>(undefined);
  public readonly activeUser$: Observable<ActiveUser | undefined>;

  constructor(
    private readonly http: HttpClient
  ) {
    this.activeUser$ = this.activeUserSubject.asObservable();
  }

  login(username: string, password: string) {
    const url = this.backendUrl + "/auth/login";
    return this.http.post<ActiveUser>(url, {username: username, password: password}).pipe(
      tap(user => this.activeUserSubject.next(user))
    );
  }

  logout(): void {
    this.activeUserSubject.next(undefined);
  }
}
