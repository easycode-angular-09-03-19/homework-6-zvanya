import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/IUser';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: IUser;
  oldUser = {};
  editMode = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private location: Location,
    private msgService: MessageService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe((data: IUser) => {
      this.user = data;
      Object.assign(this.oldUser, this.user);
    }, (err) => {
      console.log(err);
    });
  }
  
  editUser() {
    this.editMode = true;
  }
  
  cancelEditUser() {
    this.editMode = false;
    Object.assign(this.user, this.oldUser);
  }
  
  submitForm() {
    this.editMode = false;
    this.userService.editUser(this.user).subscribe((user) => {
      this.msgService.add({severity:'success', summary: 'Редактирование', detail:'Данные сохранены', key: 's'});
    },(err) => {
    
    });
  }
  
  onCloseMsgSubmit() {
    this.router.navigateByUrl('');
  }
  
  goBack() {
    this.location.back();
  }
}
