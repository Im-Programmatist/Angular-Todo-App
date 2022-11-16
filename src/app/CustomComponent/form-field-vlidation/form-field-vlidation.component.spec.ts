import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldVlidationComponent } from './form-field-vlidation.component';

describe('FormFieldVlidationComponent', () => {
  let component: FormFieldVlidationComponent;
  let fixture: ComponentFixture<FormFieldVlidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFieldVlidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldVlidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
