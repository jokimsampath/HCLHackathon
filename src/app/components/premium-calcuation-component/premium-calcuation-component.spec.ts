import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalcuationComponent } from './premium-calcuation-component';

describe('PremiumCalcuationComponent', () => {
  let component: PremiumCalcuationComponent;
  let fixture: ComponentFixture<PremiumCalcuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCalcuationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumCalcuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
