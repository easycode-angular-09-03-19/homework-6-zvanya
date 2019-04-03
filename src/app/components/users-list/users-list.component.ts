import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: IUser[];

  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((data: IUser[]) => {
      this.users = data;
    }, (err) => {
      console.log(err);
    });
  }

}
