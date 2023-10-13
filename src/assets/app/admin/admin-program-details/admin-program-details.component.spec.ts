import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgramDetailsComponent } from './admin-program-details.component';

describe('AdminProgramDetailsComponent', () => {
  let component: AdminProgramDetailsComponent;
  let fixture: ComponentFixture<AdminProgramDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProgramDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
