import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../services/forms.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewform',
  templateUrl: './viewform.component.html',
  styleUrl: './viewform.component.css'
})
export class ViewformComponent {
  formFields: any;
  formData: any = {};
  jsonData: any;form: FormGroup = this.fb.group({});
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router:Router, private service: FormService) {}

  ngOnInit(): void {
    
    
    const formId = this.route.snapshot.paramMap.get('formId');
    console.log('Retrieved Form ID:', formId);  // Debug log
    if (formId) {
      this.service.getFormStructure(formId).subscribe(
        (fields) => {
          this.formFields = fields.formFields;
          console.log('Retrieved Form Structure:', this.formFields);  // Debug log
            this.formFields.forEach((row: any) => {
              if (row.type === 'text') {
                this.form.addControl(row.label, new FormControl('', Validators.required));
              } else if (row.type === 'radio') {
                this.form.addControl(row.label, new FormControl('', Validators.required));
              }
            });

          //this.processExcelData(this.formFields);
        },
        (error) => {
          console.error('Error fetching form structure', error);
        }
      );
    }
  
}
  processExcelData(data: any) {
    this.jsonData = data.map((row: any) => {
      return { type: row[0], label: row[1], options: row.slice(2) };
    });
    
    console.log(this.jsonData)
  }
  submitForm() {
    const formId = this.route.snapshot.paramMap.get('formId');
      const newformdata=this.form.value
      console.log('Form Data to be submitted:', newformdata); 
      if (formId) {
      this.service.submitFormData(formId, newformdata).subscribe(
        (response:any) => {
          alert(response);
          this.form.reset();
        },
        (error:any) => {
          console.error('Error submitting form data', error);
        }
      );
    }
  }

}
