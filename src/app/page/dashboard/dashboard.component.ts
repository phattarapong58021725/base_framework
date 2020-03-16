import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_service/user.service.';
import { Setting } from 'src/app/_setting/setting';
import { User } from 'src/app/_model/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public id: string;
  public authorities: any = null;
  public role :any = null;
  user: User = null;
  constructor(private route: ActivatedRoute
          , public userSV: UserService) { 
    this.user = new User;
    this.authorities = this.userSV.currentUserValue.authorities;
    this.user.fullName = this.userSV.currentUserValue.fullName;
    this.user.organizeDesc = this.userSV.currentUserValue.organizeDesc;
    this.role = Setting.ROLE;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id == null){
      this.id = '';
    }
  }
}
