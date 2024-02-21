// user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  userList: any[] = [];

  constructor(private userService: UserService, private cookieService: CookieService) {}

  ngOnInit() {
    this.fetchUserList();
  }

  email: string = this.cookieService.get('email') || '';

  fetchUserList() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.userList = response.users.filter((i: any) => i.email !== this.email);
        console.log(response);
      },
      (error) => {
        console.error('Error fetching user list', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.userService.deleteOneUser(userId).subscribe(
      (response) => {
        console.log('User deleted successfully', response);
        this.fetchUserList();
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }

  updateUserRole(userId: string, currentRole: number) {
    const newRole = currentRole === 1 ? 0 : 1;

    this.userService.updateUserRole({ id: userId, role: newRole }).subscribe(
      (response) => {
        console.log('User role updated successfully', response);
        this.fetchUserList();
      },
      (error) => {
        console.error('Error updating user role', error);
      }
    );
  }
}
