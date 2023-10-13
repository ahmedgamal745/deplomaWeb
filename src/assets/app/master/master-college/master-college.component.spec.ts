import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCollegeComponent } from './master-college.component';

describe('MasterCollegeComponent', () => {
  let component: MasterCollegeComponent;
  let fixture: ComponentFixture<MasterCollegeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterCollegeComponent]
    });
    fixture = TestBed.createComponent(MasterCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
