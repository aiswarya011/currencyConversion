import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DropBoxComponent } from "../dropBox/drop-box/drop-box.component";
import { ServiceService } from '../../service/service.service';
import { ChangeDetectorRef } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-currency-card-wrapper',
  imports: [MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    DropBoxComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './currency-card-wrapper.component.html',
  styleUrl: './currency-card-wrapper.component.css'
})
export class CurrencyCardWrapperComponent {
  fromValue: number = 1;
  toValue: number = 0;
  currencyCodes: string[] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  fromDefault = 'PLN';
  toDefault = 'INR';
  convertion_rate: number = 0

  constructor(private service: ServiceService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllCurrencies()
  }


  getAllCurrencies() {
    this.service.getAllCurrency().subscribe((res) => {
      this.getContry(res.conversion_rates)
    })
  }

  getContry(rates: {}) {
    this.currencyCodes = Object.keys(rates);
  }

  handleSelectedCurrency(event: { id: string, currency: string }) {
    if (event.id === 'from') {
      this.fromCurrency = event.currency;
    } else if (event.id === 'to') {
      this.toCurrency = event.currency;
    }
    this.getConversionRate()
    console.log('From currency selected:---', this.fromCurrency);
    console.log('To currency selected:---', this.toCurrency);
  }


  exchange() {
    // Swap the default display values
    const tempDefault = this.fromDefault;
    this.fromDefault = this.toDefault;
    this.toDefault = tempDefault;

    // Swap the actual selected currency values
    const tempSelected = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = tempSelected;

    console.log('From currency selected:---', this.fromCurrency);
    console.log('To currency selected:---', this.toCurrency);
    this.clearFromValue()
    this.clearToValue()
    this.getConversionRate()
  }


  getConversionRate() {
    if (!this.fromCurrency || !this.toCurrency) {
      console.warn('From or To currency is missing.');
      return;
    }

    this.service.getConversionRates(this.fromCurrency, this.toCurrency)
      .subscribe(res => {
        console.log('Conversion rate:', res.conversion_rate);
        this.convertion_rate = Number(res.conversion_rate)
        this.cdr.detectChanges()
        this.onFromValueChange();
        this.onToValueChange()
      });
  }

  onFromValueChange() {
    if (this.convertion_rate && this.fromValue != null) {
      this.toValue = this.fromValue * this.convertion_rate;
    }
  }

  onToValueChange() {
    if (this.convertion_rate && this.toValue != null) {
      this.fromValue = this.toValue / this.convertion_rate;
    }
  }

  clearFromValue() {
    this.fromValue = 0;
    this.toValue = 0;
  }

  clearToValue() {
    this.toValue = 0;
  }
}
