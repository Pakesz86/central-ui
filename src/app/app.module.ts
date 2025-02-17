import {CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, NgModule} from '@angular/core';
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
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {CommonModule} from "@angular/common";
import {AuthInterceptor} from './shared/services/auth.interceptor';
import { MatCardModule } from '@angular/material/card';
import {ConfirmDialogModule} from './shared/confirm-dialog/confirm-dialog.module';
import {TooltipComponent} from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { Router, NavigationEnd  } from '@angular/router';


export function initializeAnalytics(router: Router): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {
      // Check if the router is initialized. This is important for SSR.
        if (router.navigated) {
            resolve();
            return;
        }
      const subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          subscription.unsubscribe(); // Important: prevent memory leaks
          resolve();
        }
      });
    });
  };
}

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ConfirmDialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['/api'],
        disallowedRoutes: ['/api/auth/login'],
      }
    }),
    TooltipComponent,
    MatChipsModule,
    FormsModule,
    MatTabsModule,
    NgxGoogleAnalyticsModule.forRoot('G-V4GBMBW3GD')
//     NgxGoogleAnalyticsRouterModule.forRoot(this.router)

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
export class AppModule {
}
