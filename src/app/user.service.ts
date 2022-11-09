import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    const users = of(USERS);
    this.messageService.add('UserService: Fetched Users');
    return users;
  }

  getUser(id: number): Observable<User> {
    //Assuming id always valid
    const user = USERS.find(u => u.id === id)!;
    this.messageService.add(`UserService: fetched user id=${id}`);
    return of(user);
  }
}
