import {Component, Inject} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router, NavigationEnd } from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./shared/services/auth.service";
import {ConfirmDialogComponent} from './shared/confirm-dialog/confirm-dialog.component';
import {dialogConstants, snackBarConstants} from './shared/constants';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  routes = new Array<string>();
  loggedIn = false;
  isAdmin = false;
  isSmallScreen: Observable<boolean> = observableOf(false);

  public loginRoutPath: string = '/login';
  public logoutRoutPath: string = '/profile';

  public selectedLanguage: string = 'en'; // Alapértelmezett nyelv

  constructor(private router: Router,
              private authService: AuthService,
              private dialog: MatDialog,
              private breakpointObserver: BreakpointObserver,
              private translate: TranslateService,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer
  ) {
    let savedLang = localStorage.getItem('language');
    if (savedLang) {
      this.selectedLanguage = savedLang;
      this.translate.setDefaultLang(savedLang);
      this.translate.use(savedLang);
    } else {
      this.translate.setDefaultLang(this.selectedLanguage);
    }
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
    );
    iconRegistry.addSvgIcon(
      'linkedin',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg')
    );
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg')
    );
    iconRegistry.addSvgIcon(
      'skype',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/skype.svg')
    );
    iconRegistry.addSvgIcon(
      'download',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/download.svg')
    );

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        gtag('config', 'G-V4GBMBW3GD', {
          page_path: event.urlAfterRedirects
        });
      });
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.authService.getAuthStatus().subscribe(
      status => {
        this.loggedIn = status;
        const roles = this.authService.getRoles();
        this.isAdmin = roles.includes('ROLE_ADMIN');
      }
    );

    this.isSmallScreen = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(map(result => result.matches));
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onSidenavClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }


  onLogin() {
    this.router.navigate(['/login']);
  }

  onProfile() {
    this.router.navigate(['/profile']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onLogoutUser() {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: dialogConstants.width.confirm,
      data: {
        message: 'Biztosan ki akar jelentkezni?',
        btnOkText: 'Igen',
        btnCancelText: 'Mégse'
      }
    });
    confirmDialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.onLogout();
    });
  }

  public changeLanguage(event$: any) {
    const newLang = event$.target.value;
    this.translate.use(newLang);
    localStorage.setItem('language', newLang); // Nyelv mentése
//     this.router.navigate(['/'])
    window.location.reload();
  }

  public getFlag(lang: string): string {
    const flags: { [key: string]: string } = {

      hu: 'assets/flags/hu.png',
      en: 'assets/flags/en.png',
      sr: 'assets/flags/sr.png'
    };
    return flags[lang] || 'assets/flags/en.png';
  }


}
