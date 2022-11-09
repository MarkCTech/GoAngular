import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // URL to web api
  private usersUrl = 'api/users';

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  //Handle Http operation failure, let app continue
  //@param operation - name of the operation that failed
  //@param result - optional value to return as the observable result
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      tap(_ => this.log('Fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  //GET user by id, else 404
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`Fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  // POST new user to the server
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newuser: User) => this.log(`Added user w/ id=${newuser.id}`)),
      catchError(this.handleError<User>('adduser'))
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions)
    .pipe(
      tap( _ => this.log(`Updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
