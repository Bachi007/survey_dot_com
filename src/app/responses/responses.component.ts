import { Component } from '@angular/core';
import { FormService } from '../services/forms.service';

interface FormResponse {
  [key: string]: any;
}

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent {
  forms: any;
  getformid: any;
  responses: any;
  fields: any;getformlabel:any;
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  chartData: any[] = [];

  constructor(private service: FormService) {}

  visualize() {
    const fieldName = this.getformlabel;
    const fieldValueCounts: { [key: string]: number } = {};

    this.responses.forEach((response: FormResponse) => {
      const value = response[fieldName];
      fieldValueCounts[value] = (fieldValueCounts[value] || 0) + 1;
    });

    const data: any[] = Object.keys(fieldValueCounts).map(key => ({
      name: key,
      value: fieldValueCounts[key]
    }));

    this.chartData = data;
  }

  getAllSubmissions() {
    this.service.getAllSubmissions(this.getformid).subscribe((res: any) => {
      this.responses = res.submissions;
      this.fields = res.formFields;
    });
  }

  ngOnInit() {
    this.service.getAllForms().subscribe((res: any) => {
      this.forms = res;
    });
  }
}
