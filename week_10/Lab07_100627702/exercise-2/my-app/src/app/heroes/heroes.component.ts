import {Component} from '@angular/core';
import {HEROES} from '../mock-heroes';
import {
    NgFor,
    NgIf,
    UpperCasePipe,

} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],

    imports: [
        FormsModule,
        NgFor,
        NgIf,
        UpperCasePipe,
    ],
})
export class HeroesComponent {

    heroes = HEROES;

}