import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllformsComponent } from './allforms.component';

describe('AllformsComponent', () => {
  let component: AllformsComponent;
  let fixture: ComponentFixture<AllformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllformsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
