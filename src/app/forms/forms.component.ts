import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormService } from '../services/forms.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface Question {
  questionNumber: number;
  questionText: string;
  options: string[];
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  form: FormGroup = this.fb.group({});
  jsonData: any;

  constructor(private fb: FormBuilder, private service:FormService) {}
  flag=false;
  onFileChange(event: any) {
    this.flag=true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.processExcelData(json);
    };
    reader.readAsArrayBuffer(file);
  }
  processExcelData(data: any) {
    this.jsonData = data.map((row: any) => {
      return { formTitle:row[0], type: row[1], label: row[2], options: row.slice(3) };
    });
    this.createForm(this.jsonData);
    console.log(this.jsonData)
  }

  createForm(data: any) {
    data.forEach((row: any) => {
      if (row.type === 'text') {
        this.form.addControl(row.label, new FormControl('', Validators.required));
      } else if (row.type === 'radio') {
        this.form.addControl(row.label, new FormControl('', Validators.required));
      }
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
  shareLink:any;
  saveFormStructure() {
    this.service.saveFormStructure(this.jsonData).subscribe((res: any) => {
      this.shareLink = res.shareableLink;
      console.log('Shareable link:', this.shareLink);
    });
  }

  generateShareLink() {
    if (this.jsonData.length > 0) {
      this.saveFormStructure();
    } else {
      console.error('No form structure to share');
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  }

}
