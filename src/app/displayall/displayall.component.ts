import { Component } from '@angular/core';
import { FormService } from '../services/forms.service';

@Component({
  selector: 'app-displayall',
  templateUrl: './displayall.component.html',
  styleUrl: './displayall.component.css'
})
export class DisplayallComponent {

  constructor(private service:FormService){}
  allforms:any;
  ngOnInit(){
    this.service.getAllForms().subscribe((res:any)=>{
      console.log(res);
      this.allforms=res;
    })
  }
  deleteForm(formId:any){
    this.service.deleteForm(formId).subscribe((res:any)=>{
      console.log(res);
      this.ngOnInit();
    })
  }
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  }
}
