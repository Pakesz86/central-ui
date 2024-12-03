import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./shared/services/auth.service";
import {ConfirmDialogComponent} from './shared/confirm-dialog/confirm-dialog.component';
import {dialogConstants, snackBarConstants} from './shared/constants';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  routes = new Array<string>();
  loggedIn = false;
  isAdmin = false;

  public loginRoutPath: string = '/login';
  public logoutRoutPath: string = '/profile';

  constructor(private router: Router,
              private authService: AuthService,
              private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.authService.getAuthStatus().subscribe(
      status => {
        this.loggedIn = status;
        const roles = this.authService.getRoles();
        this.isAdmin = roles.includes('ROLE_ADMIN');
      }
    );
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


}
