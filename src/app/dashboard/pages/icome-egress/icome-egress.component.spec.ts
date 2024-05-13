import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcomeEgressComponent } from './icome-egress.component';

describe('IcomeEgressComponent', () => {
  let component: IcomeEgressComponent;
  let fixture: ComponentFixture<IcomeEgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IcomeEgressComponent]
    });
    fixture = TestBed.createComponent(IcomeEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
