import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createFormGroupRlForm, FormGroupRlForm, InitialDataRlForm } from '../../../Helpers/rl-form/rl-form';
import { AuthApiService } from '../auth-api.service';
import { loginFormAppearance, loginValidator } from './login-form';
import { RlFormModule } from '../../../Helpers/rl-form/rl-form.module';
import { MatButtonModule } from '@angular/material/button';
import { RL_Storage } from '@randem-frames/rlStorage';
import { debounceTime, tap } from 'rxjs';
import { LoginUserInput } from '../../../../graphql/_generated/types';
import { MatError } from '@angular/material/form-field';
import { CardModule, ControlAppearanceAutoForm, RlFormsModule } from '@randem-frames/ui-rl';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'randem-frames-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [CommonModule, RlFormModule, MatButtonModule, MatError, RlFormsModule, CardModule, MatIcon],
})
export class LoginComponent implements OnInit {
    constructor(private auth: AuthApiService) {
        window.focus();
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.onEnterPress();
        }
    }

    readonly loginForm: FormGroupRlForm<LoginUserInput> = createFormGroupRlForm<LoginUserInput>(loginValidator);
    readonly loginFormAppearance: ControlAppearanceAutoForm<LoginUserInput> = loginFormAppearance;

    @RL_Storage('login')
    initialData!: InitialDataRlForm<LoginUserInput>;

    error!: string;

    log = console.log;

    ngOnInit() {
        this.loginForm.patchValue(this.initialData);
        this.loginForm.valueChanges
            .pipe(
                tap(() => (this.error = '')),
                debounceTime(300),
                tap((data: LoginUserInput) => (this.initialData = { ...data, password: data.password }))
            )
            .subscribe();
    }

    login() {
        this.auth.login(this.loginForm.value).subscribe({
            next: ({ data }) => {
                if (data) {
                    this.auth.setToken(data?.login);
                    window.location.reload();
                }
            },
            error: err => {
                err.message;
                if (err.message === 'UnauthorizedException: Invalid credentials') {
                    this.error = $localize`:@@wrongLoginOrPassword:nieprawidłowy login lub hasło`;
                }
                console.log('ERROR', { ...err });
            },
        });
    }

    onEnterPress() {
        this.login();
        console.log('Enter key pressed');
    }
}
