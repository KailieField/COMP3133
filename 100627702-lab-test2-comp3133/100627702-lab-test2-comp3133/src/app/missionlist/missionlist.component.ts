import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { SpacexService } from '../spacex.service';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})

export class MissionlistComponent implements OnInit{

  launches: any[] = [];

  constructor(private spacexService: SpacexService){}

  ngOnInit(): void {
      alert('ngOnInit is running');
        this.spacexService.getLaunches().subscribe({
          next: (data) => {
            console.log('DATA RECEIVED: ', data);
            this.launches = data;
          },

          error: (err) => {
            console.error('API CALL FAILED: ', err);
            alert('API CALLED FAILED. CHECK CONSOLE.');
          }
      });
  }
}
