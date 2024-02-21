import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
})

export class UserInfoComponent implements OnInit {
  userInfo: any = {};
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.fetchUserInfo();
  }
  
  fetchUserInfo() {
    this.userService.getUserInfo().subscribe(
      (response) => {
        this.userInfo = response.user;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching user info', error);
      }
    );
  }

  updateUserInfo(data: any) {
    this.userService.updateUserInfo(data).subscribe(
      (response) => {
        console.log('User info updated successfully', response);
        alert('User info updated successfully');
        this.fetchUserInfo();
      },
      (error) => {
        alert('Error updating user info');
        console.error('Error updating user info', error);
      }
    );
  }

  logout() {
    this.userService.logout();
  }
}
