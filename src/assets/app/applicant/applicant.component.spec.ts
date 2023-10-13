import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantComponent } from './applicant.component';

describe('ApplicantComponent', () => {
  let component: ApplicantComponent;
  let fixture: ComponentFixture<ApplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantComponent]
    });
    fixture = TestBed.createComponent(ApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
