import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { SpacexService } from '../spacex.service';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})

export class MissionlistComponent implements OnInit, OnChanges{

  launches: any[] = [];

  @Input() filteredYear: string='';

  constructor(private spacexService: SpacexService){}

  ngOnInit(): void {

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

  ngOnChanges(changes: SimpleChanges): void {

    console.log('ngOnChanges triggered: ', changes);
    
      if (changes['filteredYear'] && this.filteredYear) {
        const url = `https://api.spacexdata.com/v3/launches?launch_year=${this.filteredYear}`;
        this.spacexService.getLaunchesByUrl(url).subscribe({

          next: (data) => {
            console.log(`LAUNCHES --- ${this.filteredYear}: `, data);
            this.launches = data;
          },
          
          error: (err) => {
            console.error(`API CALL FOR ${this.filteredYear} FAILED: `, err);
          }

        });
      }
    }
}
