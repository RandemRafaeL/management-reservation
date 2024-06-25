import { Component, isDevMode, OnInit, signal } from '@angular/core';
import { AuthApiService } from '../core/auth/auth-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'randem-frames-start-template',
    templateUrl: './start-template.component.html',
    styleUrls: ['./start-template.component.sass'],
})
export class StartTemplateComponent implements OnInit {
    constructor(
        private auth: AuthApiService,
        private router: Router
    ) {}
    //

    devMode = signal(isDevMode());

    async ngOnInit() {
        console.debug('DEV MODE START');
        this.auth.token$.subscribe(() => {
            if (this.devMode()) {
                console.log('DEV MODE');
                this.router.navigate(['/dashboard/start']);
            }

            if (!this.devMode() && this.auth.currentUserValue?.access_token) {
                this.router.navigate(['/dashboard']);
            }
        });
    }
}
