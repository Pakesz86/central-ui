import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MenuComponent} from './shared/menu/menu.component';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {CommonModule} from "@angular/common";
import {AuthInterceptor} from './shared/services/auth.interceptor';
import { MatCardModule } from '@angular/material/card';
import {ConfirmDialogModule} from './shared/confirm-dialog/confirm-dialog.module';
import {TooltipComponent} from '@angular/material/tooltip';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatNavList,
    MatListItem,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    ConfirmDialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['/api'],
        disallowedRoutes: ['/api/auth/login'],
      }
    }),
    TooltipComponent
  ],
  exports: [
    CommonModule,
    ConfirmDialogModule,
    MatCardModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
