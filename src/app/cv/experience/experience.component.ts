import {Component, OnInit} from '@angular/core';
import {MatCardModule, MatCardContent, MatCardActions, MatCardSubtitle} from '@angular/material/card';
import { TranslateService } from '@ngx-translate/core';
import { Experience } from './model/experience';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {

    jobs: string[] = ['IP_ENERGY', 'EVOSOFT','NEWLINE', 'MANUFAKTURA'];
    experiencesMap: Map<string, Experience> = new Map<string, Experience>();

    constructor(private translate: TranslateService,
                private googleAnalyticsService: GoogleAnalyticsService) {
        let savedLang = localStorage.getItem('language') || 'en';
        this.translate.use(savedLang);
    }

    ngOnInit() {
        this.jobs.forEach((jobExperience) => {
          this.populateMap(jobExperience);
        });
    }

    private populateMap(type: string):void
    {
        this.translate.get([
            'EXPERIENCE.'+type+'.PICTURE',
            'EXPERIENCE.'+type+'.NAME',
            'EXPERIENCE.'+type+'.ADDRESS',
            'EXPERIENCE.'+type+'.WEB',
            'EXPERIENCE.'+type+'.TITLE',
            'EXPERIENCE.'+type+'.INTERVAL',
            'EXPERIENCE.'+type+'.DESCRIPTION',
            'EXPERIENCE.'+type+'.ROLES',
            'EXPERIENCE.'+type+'.SKILLS'
        ]).subscribe((translations: any) => {
            this.experiencesMap.set(
                type,
                {
                   picture: translations['EXPERIENCE.'+type+'.PICTURE'],
                   name: translations['EXPERIENCE.'+type+'.NAME'],
                   address: translations['EXPERIENCE.'+type+'.ADDRESS'],
                   web: translations['EXPERIENCE.'+type+'.WEB'],
                   title: translations['EXPERIENCE.'+type+'.TITLE'],
                   interval: translations['EXPERIENCE.'+type+'.INTERVAL'],
                   description: translations['EXPERIENCE.'+type+'.DESCRIPTION'],
                   roles: translations['EXPERIENCE.'+type+'.ROLES'],
                   skills: translations['EXPERIENCE.'+type+'.SKILLS']
               } as Experience);
        });
    }


}
