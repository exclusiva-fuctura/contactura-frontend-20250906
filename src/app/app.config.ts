import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DaoService } from './shared/services/dao.service';
import { AppState } from './app.state';
import { LancamentosService } from './shared/services/lancamentos';
import { MenuService } from './shared/services/menu.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    LancamentosService,
    MenuService,
    DaoService,
    AppState
  ]
};
