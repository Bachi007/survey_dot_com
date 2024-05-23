import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private service : UserService,private router:Router){}
  userId:any;
  userName:any;
  userEmail:any;
  userPassword:any;
  userMobile:any;user:any;
  msg:any;
  mail="techteam@surveymonkey.com"
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
  }

