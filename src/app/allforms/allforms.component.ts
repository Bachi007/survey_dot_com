import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allforms',
  templateUrl: './allforms.component.html',
  styleUrls: ['./allforms.component.css'] // Note: corrected "styleUrl" to "styleUrls"
})
export class AllformsComponent implements OnInit {

  constructor(private service: FormService, private router: Router) {}

  allforms: any;
  user:any;uname:any;
  ngOnInit() {
    this.user= JSON.parse(localStorage.getItem('user') || '{}');
    this.uname=this.user.userName;
    this.service.getAllForms().subscribe((res: any) => {
      console.log(res);
      // Filter forms based on submissions
      this.allforms = res.filter((form: any) => !this.isUserSubmitted(form));
    });
  }

  isUserSubmitted(form: any): boolean {
    // Assuming you have a way to identify submissions of the current user
    // Check if there are submissions for this form by the current user
    return form.submissions.some((submission: any) => submission.username === this.uname);
  }

  openForm(formId: any) {
    this.router.navigateByUrl(`/form/${formId}`);
  }

  getCurrentUser(): string {
    // Replace this with your actual method to get the current user's username
    return 'username'; // Example: Replace with actual username retrieval
  }
}
