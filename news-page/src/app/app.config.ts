import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import '@angular/compiler';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { JetstreamWsService } from '@his-base/jetstream-ws';
import '@angular/localize/init';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {

  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideAnimations(), provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot({

      loader: {

      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient]

      },

      })),
    {
      provide: JetstreamWsService,
      useValue: new JetstreamWsService({ name: 'OPD'})
    }
  ]
};

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes)]
// };
