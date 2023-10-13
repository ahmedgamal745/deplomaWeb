import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentsComponent } from './show-students.component';

describe('ShowStudentsComponent', () => {
  let component: ShowStudentsComponent;
  let fixture: ComponentFixture<ShowStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowStudentsComponent]
    });
    fixture = TestBed.createComponent(ShowStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
