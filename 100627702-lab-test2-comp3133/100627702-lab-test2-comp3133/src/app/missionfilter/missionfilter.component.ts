import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})

export class MissionfilterComponent {
  
  filteredYear: string='';

  @Output() inputYear = new EventEmitter<string>();

  filterMissionList() {
    this.inputYear.emit(this.filteredYear);
  }
    
}


