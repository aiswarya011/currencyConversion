import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-history',
 imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
showFiller = false;
}
