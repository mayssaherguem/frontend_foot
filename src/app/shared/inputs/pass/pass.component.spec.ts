import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PassComponent } from './pass.component';

describe('PassComponent', () => {
  let component: PassComponent;
  let fixture: ComponentFixture<PassComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
