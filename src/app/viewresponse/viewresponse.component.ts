import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/forms.service';

@Component({
  selector: 'app-viewresponse',
  templateUrl: './viewresponse.component.html',
  styleUrls: ['./viewresponse.component.css']
})
export class ViewresponseComponent implements OnInit {

  responses: any;
  user: any;
  uname: any;
  formSubmissions: { formTitle: string, columns: string[], submissions: any[] }[] = [];

  constructor(private service: FormService) {}

  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.uname = this.user.userName;

    this.service.getAllForms().subscribe((res: any) => { 
      this.responses = res;
      this.processData(); 
    });
  }

  processData() {
    this.formSubmissions = [];

    for (let form of this.responses) {
      let userSubmissions = form.submissions.filter((submission: any) => submission.username === this.uname);
      
      if (userSubmissions.length > 0) {
        const columns = Object.keys(userSubmissions[0]).filter(key => key !== 'username' && key !== '__v');
        this.formSubmissions.push({
          formTitle: form.formTitle,
          columns: columns,
          submissions: userSubmissions
        });
      }
    }
  }
}
