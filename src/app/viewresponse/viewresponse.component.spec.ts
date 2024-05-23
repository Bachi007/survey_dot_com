import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewresponseComponent } from './viewresponse.component';

describe('ViewresponseComponent', () => {
  let component: ViewresponseComponent;
  let fixture: ComponentFixture<ViewresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
