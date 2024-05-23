import { Component } from '@angular/core';
import { FormService } from '../services/forms.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  forms:any;formLength:any;response:any;responseLength=0;users=[];
  userlength:any;
  constructor(private service:FormService,private userService:UserService){}
  calc(){
    this.formLength=this.forms.length;
    
    for(let a of this.forms){
      
      this.responseLength+=a.submissions.length;
    }
    this.userlength=this.users.length;
    console.log("users"+this.users);
  }
  ngOnInit(){
    this.userService.getAllUsers().subscribe((res:any)=>{
      console.log(res);
      this.users=Object.values(res);
    })
    this.service.getAllForms().subscribe((res:any)=>{
      console.log(res);
      this.forms=res;
      this.response=res.submissions;
      this.calc();
      console.log(this.response);
    });
    
}

}
