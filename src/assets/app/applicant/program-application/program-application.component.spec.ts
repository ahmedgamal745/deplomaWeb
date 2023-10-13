import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramApplicationComponent } from './program-application.component';

describe('ProgramApplicationComponent', () => {
  let component: ProgramApplicationComponent;
  let fixture: ComponentFixture<ProgramApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramApplicationComponent]
    });
    fixture = TestBed.createComponent(ProgramApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
