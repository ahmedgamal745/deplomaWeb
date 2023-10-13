import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeplomsComponent } from './deploms.component';

describe('DeplomsComponent', () => {
  let component: DeplomsComponent;
  let fixture: ComponentFixture<DeplomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeplomsComponent]
    });
    fixture = TestBed.createComponent(DeplomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
