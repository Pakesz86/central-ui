import {Component} from '@angular/core';
import {MatCardModule, MatCardContent, MatCardActions, MatCardSubtitle} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {

  constructor(private translate: TranslateService,
              private googleAnalyticsService: GoogleAnalyticsService) {
    let savedLang = localStorage.getItem('language') || 'en';
    this.translate.use(savedLang);
  }

  educationList = [
    {
      label: 'EDUCATION.COLLAGE.TAB_TITLE',
      images: [
        "assets/img/vts.jpg"
      ],
      name: "EDUCATION.COLLAGE.SCHOOL_NAME",
      profession: "EDUCATION.COLLAGE.PROFESSION",
      interval: 'EDUCATION.COLLAGE.INTERVAL',
      description: "EDUCATION.COLLAGE.DESCRIPTION"
    },
    {
      label: "EDUCATION.HIGH_SCHOOL.TAB_TITLE",
      images: [
        "assets/img/politechnicka.jpg"
      ],
       name: "EDUCATION.HIGH_SCHOOL.SCHOOL_NAME",
       profession: "EDUCATION.HIGH_SCHOOL.PROFESSION",
       interval: 'EDUCATION.HIGH_SCHOOL.INTERVAL',
       description: "EDUCATION.HIGH_SCHOOL.DESCRIPTION"
    }
  ];
}
