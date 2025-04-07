import { Component } from '@angular/core';
import { StudentsComponent } from './students.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [StudentsComponent],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student-app';
}
