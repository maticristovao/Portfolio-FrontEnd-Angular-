/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// window.onbeforeunload = function () { window.scrollTo(0, 0); }
// window.onload = function () { window.scrollTo(0, 0); }
// window.onloadstart = function () { window.scrollTo(0, 0); }
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));