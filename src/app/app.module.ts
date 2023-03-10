import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './shared';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule} from "@ngrx/store";
import { reducers, metaReducers } from "./core/state";

import { EffectsModule } from "@ngrx/effects";
import { MenusEffects } from "./core/state/menus";
import { UserEffects } from "./core/state/user";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: [
          `${environment.serverUrl}/api/menu/items`,
          `${environment.serverUrl}/api/menu/items/*`,
        ],
      },
    }),
    AppRoutingModule,
    NavBarModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([MenusEffects, UserEffects]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
