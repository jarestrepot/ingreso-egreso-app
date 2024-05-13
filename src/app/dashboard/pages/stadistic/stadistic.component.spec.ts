import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadisticComponent } from './stadistic.component';

describe('StadisticComponent', () => {
  let component: StadisticComponent;
  let fixture: ComponentFixture<StadisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadisticComponent]
    });
    fixture = TestBed.createComponent(StadisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
