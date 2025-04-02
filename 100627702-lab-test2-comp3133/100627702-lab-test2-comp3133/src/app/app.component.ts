import { Component } from '@angular/core';
import { MissionlistComponent } from './missionlist/missionlist.component';
import { MissionfilterComponent } from './missionfilter/missionfilter.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MissionlistComponent, MissionfilterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '100627702-lab-test2-comp3133';

  filteredYear: string='';

  updateYearFromFilter(year: string){
    this.filteredYear = year;
  }
}
