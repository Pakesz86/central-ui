import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SkillsRoutingModule} from './skills-routing.module';
import {SkillsComponent} from './skills.component';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms'

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    SkillsRoutingModule,
    MatChipsModule,
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
export class SkillsModule {
}
