import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayallComponent } from './displayall.component';

describe('DisplayallComponent', () => {
  let component: DisplayallComponent;
  let fixture: ComponentFixture<DisplayallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
