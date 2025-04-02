import { Component } from '@angular/core';
// import { MissionlistComponent } from './missionlist/missionlist.component';
// import { MissionfilterComponent } from './missionfilter/missionfilter.component';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule ], //MissionlistComponent, MissionfilterComponent,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '100627702-lab-test2-comp3133';

  filteredYear: string='';

  updateYearFromFilter(year: string){

    console.log('Year component rcvd from filter component: ', year);
    this.filteredYear = year;
    
  }
}
