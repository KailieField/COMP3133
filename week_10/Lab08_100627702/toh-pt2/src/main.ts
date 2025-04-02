import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { HeroesComponent } from './app/heroes/heroes.component';

bootstrapApplication(HeroesComponent, {
  providers: [provideProtractorTestingSupport()],
});

