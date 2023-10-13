import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAdminsComponent } from './master-admins.component';

describe('MasterAdminsComponent', () => {
  let component: MasterAdminsComponent;
  let fixture: ComponentFixture<MasterAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterAdminsComponent]
    });
    fixture = TestBed.createComponent(MasterAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
