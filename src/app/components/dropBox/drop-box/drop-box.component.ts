import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drop-box',
  imports: [MatAutocompleteModule, MatInputModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './drop-box.component.html',
  styleUrl: './drop-box.component.css'
})
export class DropBoxComponent {
  @Input() id: string = ''
  @Input() currencyCodes: string[] = []
  @Output() emittedCurrency = new EventEmitter<{ id: string, currency: string }>()
  @Input() defaultValue: string = ''
  selectedCurrency: string = '';

  constructor() { }

  ngOnInit() {
    if (this.defaultValue) {
      this.selectedCurrency = this.defaultValue;
    } else {
      this.selectedCurrency = this.currencyCodes ? this.currencyCodes[0] : 'null'
    }
    this.selectedCurrency ? this.getSelectedCurrency() : 'null'
  }

  handleCurrencySelection() {
    this.getSelectedCurrency()
  }

  getSelectedCurrency() {
    console.log('called');
    this.emittedCurrency.emit({
      id: this.id,            // ✅ include who sent it
      currency: this.selectedCurrency         // ✅ the selected value
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['defaultValue'] && changes['defaultValue'].currentValue !== this.selectedCurrency) {
      this.selectedCurrency = changes['defaultValue'].currentValue;
    }
  }

  displayFn(currency: string): string {
    return currency ?? '';
  }
}
