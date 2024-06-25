/* eslint-disable */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { companyActions, selectCompanyError } from './company.store';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';
import { userSelectState } from '../user';
import { CreateCompanyGQL } from '../../../graphql/company/createCompany.mutation.generated';
import { UpdateCompanyGQL } from '../../../graphql/company/updateCompany.mutate.generated';
import { ListCompanyGQL, ListCompanyQuery } from '../../../graphql/company/listCompany.query.generated';
import { DeleteCompanyGQL } from '../../../graphql/company/deleteCompany.mutate.generated';
import { ListCompanyForUserGQL } from '../../../graphql/company/listCompanyUser.query.generated';
import { selectUserData } from '../user/_user.store';
import { CreateCompanyForUserGQL } from '../../../graphql/company/createCompanyForUser.mutation.generated';
import { UpdateCompanyForUserGQL } from '../../../graphql/company/updateCompanyForUser.mutate.generated';
import { HttpErrorService } from '../../http-services/http-error.service';

@Injectable()
export class CompanyEffect {
    constructor(
        private actions$: Actions,
        private store: Store,
        private listCompanyGQL: ListCompanyGQL,
        private listCompanyForUserGQL: ListCompanyForUserGQL,
        private createCompanyGQL: CreateCompanyGQL,
        private createCompanyForUserGQL: CreateCompanyForUserGQL,
        private updateCompanyGQL: UpdateCompanyGQL,
        private updateCompanyForUserGQL: UpdateCompanyForUserGQL,
        private deleteCompanyGQL: DeleteCompanyGQL,
        private httpErrorService: HttpErrorService
    ) {}

    loadCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.load),
            tap(() => this.store.dispatch(companyActions.loadingStart({ isLoading: true }))),

            switchMap(() =>
                this.store.select(selectUserData).pipe(
                    switchMap(user =>
                        this.listCompanyForUserGQL.fetch().pipe(
                            map(res => {
                                return companyActions.loadSuccess({ companies: res.data.listCompanyForUser });
                            }),
                            catchError(error => of(companyActions.loadFailure(error)))
                        )
                    )
                )
            ),
            tap({
                next: () => this.store.dispatch(companyActions.loadingEnd({ isLoading: false })),
                error: () => this.store.dispatch(companyActions.loadingEnd({ isLoading: false })),
            })
        )
    );

    deleteCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.deleteOne),
            switchMap(({ companyId }) =>
                this.deleteCompanyGQL.mutate({ removeCompanyId: companyId }).pipe(
                    map(() => companyActions.deleteOneSuccess({ companyId })),
                    catchError(error => {
                        this.httpErrorService.handleError(error);
                        return of(
                            companyActions.deleteOneFailure({
                                companyId,
                                ...error, // Tutaj dostosowujesz, aby dopasować strukturę obiektu błędu
                            })
                        );
                    })
                )
            )
        )
    );

    createCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.createOne),
            switchMap(({ company }) => {
                return this.createCompanyForUserGQL.mutate({ createCompanyInput: company }).pipe(
                    map(result => {
                        return companyActions.createOneSuccess({
                            company: { ...result.data!.createCompanyForUser },
                        });
                    }),
                    catchError(error => of(companyActions.createOneFailure(error)))
                );
            })
        )
    );

    updateCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(companyActions.updateOne),
            switchMap(({ companyId, company }) => {
                console.log('company', company);
                return this.updateCompanyForUserGQL
                    .mutate({ updateCompanyId: companyId, updateCompanyForUserInput: company })
                    .pipe(
                        map(res => {
                            return companyActions.updateOneSuccess({
                                company: { ...res.data!.updateCompanyForUser },
                            });
                        }),
                        catchError(error => of(companyActions.updateOneFailure(error)))
                    );
            })
        )
    );
}
