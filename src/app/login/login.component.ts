import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private service: UserService, private router: Router) { }
  loginusername: any;
  loginuserpassword: any;
  user: any;
  msg:any;
  userId:any;
  userName:any;
  userEmail:any;
  userPassword:any;
  userMobile:any;
  mail="techteam@survey.com"
  register(){
    this.user={
      //userId:this.userId,
      userName:this.userName,
      userEmail:this.userEmail,
      userPassword:this.userPassword,
      userMobile:this.userMobile,
      userRole:'user'
    }
    this.service.reg(this.user).subscribe((res:any)=>{
      this.msg=res;
      // alert(this.msg)
      // this.router.navigateByUrl('/login')
        if(this.msg=="user registered"){
          Swal.fire({
            title: 'Registration Successful!',
            text: this.msg,
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.userName="";
          this.userEmail="";
          this.userPassword="";
          this.userMobile="";
          
        }
        else{
          Swal.fire({
            title: 'Registration not Successful!',
            text: this.msg,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
        this.router.navigateByUrl('/login');
      });
    }
  login() {
   
    this.user = {
        userName:this.loginusername,
        userPassword:this.loginuserpassword
    }
    this.service.login(this.user).subscribe((res:any)=>{
      this.msg=res;
      if(this.msg=="Login success as admin"){
        Swal.fire({
          title: 'Hey Admin Login  Successful!',
          text: this.msg,
          icon: 'success',
          confirmButtonText: 'OK'
        })
        localStorage.setItem('user',JSON.stringify(this.user));
        this.router.navigateByUrl('/admin/home')
      }
      else if(this.msg=="Login success as user"){
        Swal.fire({
          title: 'Hey Login  Successful!',
          text: this.msg,
          icon: 'success',
          confirmButtonText: 'OK'
        })
        localStorage.setItem('user',JSON.stringify(this.user));
        this.router.navigateByUrl('/user/all')
      }
      else{
        alert(this.msg)
      }
    })
  }
}

