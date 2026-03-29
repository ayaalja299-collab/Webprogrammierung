import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInfo } from './change-info';

describe('ChangeInfo', () => {
  let component: ChangeInfo;
  let fixture: ComponentFixture<ChangeInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
