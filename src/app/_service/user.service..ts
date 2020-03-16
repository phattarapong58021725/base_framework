import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_model/user';

@Injectable()
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public POS_ROLE = ['POS_UPLOADER', 'POS_VIEWER'];
  constructor(
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  validateMenu(path){
    // console.log("currentUserSubject.value.authorities", this.currentUserSubject.value.authorities);
    let checking = this.currentUserSubject.value.authorities.find((val ,i)=>{
      return val === path;
    });
    if(checking){
      return true;
    }else{
      return false
    }
  }
  logIn(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
