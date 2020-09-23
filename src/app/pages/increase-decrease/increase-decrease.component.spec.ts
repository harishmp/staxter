import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseDecreaseComponent } from './increase-decrease.component';

describe('IncreaseDecreaseComponent', () => {
  let component: IncreaseDecreaseComponent;
  let fixture: ComponentFixture<IncreaseDecreaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncreaseDecreaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseDecreaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
