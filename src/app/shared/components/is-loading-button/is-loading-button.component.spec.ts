import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsLoadingButtonComponent } from './is-loading-button.component';

describe('IsLoadingButtonComponent', () => {
  let component: IsLoadingButtonComponent;
  let fixture: ComponentFixture<IsLoadingButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsLoadingButtonComponent]
    });
    fixture = TestBed.createComponent(IsLoadingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
