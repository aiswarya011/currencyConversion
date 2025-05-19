import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HistoryComponent } from "../history/history.component";


@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, HistoryComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  token: string | null = ''
  name: string | null = ''
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.token = sessionStorage.getItem('token')
    this.name = sessionStorage.getItem('user')
  }

  openLoginDialog() {
    this.dialog.open(DialogComponent, {
      data: { type: 'login' },
      width: '400px' // Optional: you can adjust size
    });
  }

  openRegisterDialog() {
    this.dialog.open(DialogComponent, {
      data: { type: 'register' },
      width: '400px' // Optional: you can adjust size
    });
  }

  logOut() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    window.location.reload()
  }

  historyDialog(){
     this.dialog.open(HistoryComponent, {
      width: '400px'
    });
  }
}
