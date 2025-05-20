import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ServiceService } from '../../service/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  showFiller = false;
  cleared: boolean = false;
  historyData: any = []
  constructor(private service: ServiceService,private http: HttpClient) { }

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;
    this.service.getUserHistory(userId).subscribe((res: any) => {
      this.historyData = res
      console.log(this.historyData);

    })
  }

  clearHistory() {
    this.cleared = false
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    return this.http.get<any[]>(`http://localhost:3000/history?userId=${userId}`).subscribe(historyItems => {
      historyItems.forEach(item => {
        this.http.delete(`http://localhost:3000/history/${item.id}`).subscribe(
          res=>{
            this.cleared = true
          }
        );
      });
    });

  }
}
