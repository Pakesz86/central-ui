import {Component} from '@angular/core';
import {MatCardModule, MatCardContent, MatCardActions, MatCardSubtitle} from '@angular/material/card';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private translate: TranslateService,
              private googleAnalyticsService: GoogleAnalyticsService) {
    let savedLang = localStorage.getItem('language') || 'en';
    this.translate.use(savedLang);
  }

  public downloadPDF(): void {

    this.googleAnalyticsService.event('PDF', 'Download', 'EndrePakaiCV.pdf'); //.event('Category', 'Action', 'Label');
    const link = document.createElement('a');
    link.href = 'assets/pdf/EndrePakaiCV.pdf'; // Az elérési út a PDF fájlhoz
    link.download = 'EndrePakaiCV.pdf'; // A letöltött fájl neve
    link.click(); // Kattintás szimulálása, hogy elinduljon a letöltés
  }



}
