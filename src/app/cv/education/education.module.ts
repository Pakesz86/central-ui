import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EducationRoutingModule} from './education-routing.module';
import {EducationComponent} from './education.component';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms'


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    EducationComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    EducationRoutingModule,
    MatTabsModule,

    HttpClientModule,
     TranslateModule.forRoot({
       loader: {
         provide: TranslateLoader,
         useFactory: createTranslateLoader,
         deps: [HttpClient]
       }
     }),
     FormsModule
  ]
})
export class EducationModule {
}
