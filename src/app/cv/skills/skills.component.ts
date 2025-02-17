import {Component, OnInit} from '@angular/core';
import {MatCardModule, MatCardContent, MatCardActions, MatCardSubtitle} from '@angular/material/card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Skill } from './model/skill';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {

  public videoUrl: SafeResourceUrl;
  public skillsMap: Map<string, Skill> = new Map<string, Skill>();
  public skillKeys: string[] = ['WEB', 'DESKTOP', 'MOBILE', 'DATABASE', 'VERSION', 'GRAPHIC', 'MANAGEMENT',
    'LANGUAGES', 'DRIVER', 'CITIZENSHIP', 'DIY', 'HOBBIES'];

  constructor(private sanitizer: DomSanitizer,
              private translate: TranslateService,
              private googleAnalyticsService: GoogleAnalyticsService) {
    let savedLang = localStorage.getItem('language') || 'en';
    this.translate.use(savedLang);
    this.videoUrl = this.sanitizeUrl('olUCGw4AyJY');
  }

  ngOnInit() {
     this.skillKeys.forEach((skillKey) => {
         this.populateSkills(skillKey);
      });
  }


  sanitizeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  private populateSkills(type: string): void{
        this.translate.get([
            'SKILLS.'+type+'.TITLE',
            'SKILLS.'+type+'.DESCRIPTION_TITLE',
            'SKILLS.'+type+'.DESCRIPTION',
            'SKILLS.'+type+'.VIDEO_ID',
            'SKILLS.'+type+'.TAGS'
        ]).subscribe((translations: any) => {
          let skill = {
                    title: translations['SKILLS.'+type+'.TITLE'],
                    descriptionTitle: translations['SKILLS.'+type+'.DESCRIPTION_TITLE'],
                    description: translations['SKILLS.'+type+'.DESCRIPTION'],
                    videoId: type === 'DIY' ? this.videoUrl : null,
                    tags: translations['SKILLS.'+type+'.TAGS']
                  } as Skill;

          this.skillsMap.set(type, skill);
        });
    }
}
