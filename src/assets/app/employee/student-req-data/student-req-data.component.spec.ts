import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReqDataComponent } from './student-req-data.component';

describe('StudentReqDataComponent', () => {
  let component: StudentReqDataComponent;
  let fixture: ComponentFixture<StudentReqDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentReqDataComponent]
    });
    fixture = TestBed.createComponent(StudentReqDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
