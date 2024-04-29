import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeVariationComponent } from './time-variation.component';

describe('TimeVariationComponent', () => {
  let component: TimeVariationComponent;
  let fixture: ComponentFixture<TimeVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeVariationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
