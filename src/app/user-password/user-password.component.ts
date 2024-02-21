import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
})

export class UserPasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  
  constructor(private userService: UserService) {}

  updateUserPassword(data: any) {
    let passwords = {};
    if(data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else {
      passwords = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }
    }
    this.userService.updateUserPassword(passwords).subscribe(
      (response) => {
        console.log('User password updated successfully', response);
        alert('User password updated successfully');
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      (error) => {
        alert(error.error.error);
        console.error('Error updating user password', error);
      }
    );
  }
}
