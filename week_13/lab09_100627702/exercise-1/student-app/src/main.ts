import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { isPlatformBrowser } from '@angular/common';

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.log(err));
