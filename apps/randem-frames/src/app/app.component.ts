import { Component, enableProdMode, isDevMode, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { debounceTime, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, setTheme, TemplateState, ThemeState } from './state/randem-frame.store';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthApiService } from './core/auth/auth-api.service';
import { environment } from '../environments/environment';
import { RL_Storage } from '@randem-frames/rlStorage';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DialogFormService } from './templates/dialog-modal/dialog-form/dialog-form.service';

@Component({
    selector: 'randem-frames-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DialogFormService],
})
export class AppComponent implements OnInit, OnDestroy {
    themeSubscription!: Subscription;

    loginOpenedDialog!: DialogRef<never, LoginComponent>;

    constructor(
        private store: Store<AppState>,
        private renderer: Renderer2,
        private dialog: Dialog,
        private auth: AuthApiService,
        private matIconRegistry: MatIconRegistry,
        private router: Router,
        private dialogFormService: DialogFormService
    ) {
        matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    }
    @RL_Storage('templateState')
    templateState!: TemplateState;

    ngOnInit() {
        if (!isDevMode()) {
            enableProdMode();
        }
        if (window && !environment.logs) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            window.console.log = function () {};
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            window.console.warn = function () {};
        }

        this.themeSubscription = this.store
            .select(state => state.template.theme)
            .pipe(tap(theme => this.updateBodyClass(theme)))
            .subscribe();

        // Sprawdzenie logowania

        this.auth.token$.subscribe(token => {
            console.log('token', token);
            if (!token?.access_token) {
                this.dialogFormService.openFormDialog(LoginComponent);
            }
        });

        // zapis odczyt stora tematu
        if (this.templateState) {
            this.store.dispatch(setTheme({ theme: this.templateState.theme }));
        } else {
            this.checkColorSchemePreference();
        }

        this.store
            .select(state => state.template)
            .pipe(debounceTime(1000))
            .subscribe(template => (this.templateState = template));
    }

    ngOnDestroy() {
        this.themeSubscription?.unsubscribe();
    }

    checkColorSchemePreference() {
        const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)').matches;
        this.store.dispatch(setTheme({ theme: prefersLightScheme ? 'light' : 'dark' }));
    }

    updateBodyClass(theme: ThemeState) {
        this.renderer.removeClass(document.body, theme === 'light' ? 'dark' : 'light');
        this.renderer.addClass(document.body, theme.toString());
    }
}
