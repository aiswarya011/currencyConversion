import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCardWrapperComponent } from './currency-card-wrapper.component';

describe('CurrencyCardWrapperComponent', () => {
  let component: CurrencyCardWrapperComponent;
  let fixture: ComponentFixture<CurrencyCardWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyCardWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyCardWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
