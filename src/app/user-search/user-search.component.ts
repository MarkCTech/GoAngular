import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users$!: Observable<User[]>;
  private searchTerms = new Subject<string>();

  constructor(private userservice: UserService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      // Wait ms on keystroke before considering
      debounceTime(300),
      // Ignore same term resubmission
      distinctUntilChanged(),
      // Observable change when term changes
      switchMap((term: string) => this.userservice.searchUsers(term)),
    );
  }
}
