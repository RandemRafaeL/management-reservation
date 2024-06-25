import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, map, catchError, tap } from 'rxjs';
import * as userState from './index';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { Store } from '@ngrx/store';
import { CreateCompanyGQL } from '../../../graphql/company/createCompany.mutation.generated';
import { GetCurrentUserGQL, GetCurrentUserQuery } from '../../../graphql/user/getCurrentUser.query.generated';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private createCompany: CreateCompanyGQL,
        private getCurrentUser: GetCurrentUserGQL
    ) {}

    loadCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userState.userActions.loadCurrentUser),
            tap(() => this.store.dispatch(userState.userActions.loadingUserStart({ isLoading: true }))),
            switchMap(() => {
                return this.getCurrentUser.fetch().pipe(
                    map(({ data, error }: ApolloQueryResult<GetCurrentUserQuery>) => {
                        console.log('current user', data.getCurrentUser, error);
                        if (error || !data.getCurrentUser) {
                            console.error('Error fetching current user:', error);
                            return userState.userActions.loadUserFailure({ error });
                        }
                        const { id, username, role } = data.getCurrentUser;
                        const user: Omit<userState.UserState, '_isLoading' | '_error'> = { id, username, role };
                        return userState.userActions.loadUserSuccess({ user });
                    }),
                    catchError(error => {
                        return of(userState.userActions.loadUserFailure({ error }));
                    }),
                    catchError(() => of(userState.userActions.resetUser()))
                );
            }),
            tap({
                next: () => this.store.dispatch(userState.userActions.loadingUserEnd({ isLoading: false })),
                error: () => this.store.dispatch(userState.userActions.loadingUserEnd({ isLoading: false })),
            })
        )
    );
}
