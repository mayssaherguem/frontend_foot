import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundBordersComponent } from './round-borders.component';

describe('RoundBordersComponent', () => {
  let component: RoundBordersComponent;
  let fixture: ComponentFixture<RoundBordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundBordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundBordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
