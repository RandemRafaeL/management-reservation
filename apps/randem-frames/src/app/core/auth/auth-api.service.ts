import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { userActions } from '../../state/user';
import { Store } from '@ngrx/store';
import { LoginGQL, LoginMutationVariables } from '../../../graphql/auth/login.mutation.generated';
import { AuthTokenType, LoginUserInput } from '../../../graphql/_generated/types';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store,
        private login_gql: LoginGQL
    ) {}

    private apiUrl = '/api';

    // @RL_Storage('token')
    // private token!: AuthTokenType;

    get token() {
        return JSON.parse(`${sessionStorage.getItem('sesToken')}`) as AuthTokenType;
    }

    set token(token: AuthTokenType) {
        sessionStorage.setItem('sesToken', JSON.stringify(token));
    }

    private _token$: BehaviorSubject<AuthTokenType | null> = new BehaviorSubject<AuthTokenType | null>({
        access_token: this.token?.access_token,
    });

    public token$: Observable<AuthTokenType | null> = this._token$ //
        .pipe(
            tap(token => {
                if (token && token.access_token) {
                    this.token = token;
                }
            })
        );

    get bearerToken() {
        return `Bearer ${this.token.access_token}`;
    }

    public get currentUserValue(): AuthTokenType | null {
        return this._token$.value;
    }

    setToken(value: AuthTokenType) {
        this._token$.next(value);
    }

    login(credentials: LoginUserInput) {
        const loginVariables: LoginMutationVariables = {
            loginUserInput: credentials,
        };

        return this.login_gql.mutate(loginVariables).pipe(
            tap(res => {
                if (res?.data) {
                    this._token$.next(res.data.login);
                    this.store.dispatch(userActions.loadCurrentUser());
                }
            })
        );
    }
    logout() {
        sessionStorage.removeItem('sesToken');
        this._token$.next(null);
        if (!isDevMode()) {
            this.router.navigate(['/']).then(() => {
                window.location.reload();
            });
        }
    }
}
