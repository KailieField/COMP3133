import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpacexService } from '../spacex.service';
import { MaterialModule } from '../material/material.module';


@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})

export class MissiondetailsComponent implements OnInit {
  mission: any;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexService
  ) {}

  ngOnInit(): void {
      const flightNumber = Number(this.route.snapshot.paramMap.get('flight_number'));
      this.spacexService.getLaunchByFlightNumber(flightNumber).subscribe({

        next: (data) => {
          this.mission = data;
          console.log('MISSION DETAILS LOADED: ', data);
        },

        error: (err: any) => {
          console.log('MISSION DETAILS FAILED TO LOAD: ', err);
        }
      });
  }

}
