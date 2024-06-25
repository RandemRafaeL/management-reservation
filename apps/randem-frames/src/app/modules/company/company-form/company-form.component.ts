import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { RL_Storage } from '@randem-frames/rlStorage';
import { InitialDataRlForm } from '../../../Helpers/rl-form/rl-form';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { CompanyType, CreateCompanyInput } from '../../../../graphql/_generated/types';
import { companyActions, selectCompanyById, selectCompanyError } from '../../../state/company/company.store';
import { Actions, ofType } from '@ngrx/effects';
import { filter, Observable, Subscription, take } from 'rxjs';
import { HttpErrorService } from '../../../http-services/http-error.service';
import { map } from 'rxjs/operators';
import { BreakpointService, BreakPointsList } from '../../../core/services/breakpoints/breakpoint.service';
import { ListUserGQL } from '../../../../graphql/user/listUser.query.generated';
import { selectUserData } from '../../../state/user/_user.store';
import { CompanyFormService } from './company-form.service';

@Component({
    selector: 'randem-frames-company-form',
    templateUrl: './company-form.component.html',
    styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnInit, OnDestroy {
    constructor(
        @Optional() public dialogRef: DialogRef<CompanyType, CompanyFormComponent>,
        @Inject(DIALOG_DATA) public dialogData: CompanyType,

        private store: Store,
        private action$: Actions,
        private error: HttpErrorService,
        private breakpointService: BreakpointService,
        private listUserGQL: ListUserGQL,
        private companyFormService: CompanyFormService
    ) {}

    @RL_Storage('company')
    initialData!: InitialDataRlForm<CreateCompanyInput> | null;

    companyFormAppearance = this.companyFormService.companyAppearance;
    companyForm = this.companyFormService.companyFormGroup;

    currentId!: string;
    breakpoint$: Observable<BreakPointsList> = this.breakpointService.getBreakpoint$();
    subscriptions = new Subscription();
    user$!: Observable<{ id: string; option: string }[]>;

    ngOnInit() {
        this.user$ = this.listUserGQL.fetch().pipe(
            map(res =>
                res.data.listUsers.map(user => ({
                    id: user.id,
                    option: user.username,
                }))
            )
        );

        this.store
            .select(selectUserData)
            .pipe(filter(user => !!user))
            .subscribe(user => {
                console.log('user', user);
                if (user.role === 'ADMIN') {
                    this.companyFormAppearance.userId.hidden = false;
                }
                this.companyForm.get('userId')?.patchValue(user.id);
            });

        this.store
            .select(selectCompanyById(this.dialogData.id))
            .pipe(
                filter(company => !!company),
                take(1)
            )
            .subscribe(company => {
                this.companyForm.patchValue({ ...company, userId: company?.user?.id }); // Do poprawki
            });

        this.currentId = this.dialogData?.id;
        this.companyForm.patchValue(this.dialogData || this.initialData);

        console.log('updateAndValidity', this.dialogData || this.initialData);

        this.companyForm.valueChanges.subscribe(data => (this.initialData = data));

        this.subscriptions.add(
            this.store
                .select(selectCompanyError)
                .pipe(
                    filter(res => !!res?.graphQLErrors),
                    map(res => res.graphQLErrors)
                )
                .subscribe({ error: error => this.error.handleGqlError(error.message) })
        );

        if (this.companyFormAppearance.userId.controlType === 'select') {
            this.companyFormAppearance.userId.select.data$ = this.listUserGQL //
                .fetch()
                .pipe(
                    map(res =>
                        res.data.listUsers.map(user => ({
                            id: user.id,
                            name: user.username,
                        }))
                    )
                );
        }
    }

    ngOnDestroy() {
        this.subscriptions?.unsubscribe();
    }

    closeDialog(data: CompanyType = this.dialogData) {
        console.log('DialogData', this.dialogData);
        if (this.currentId) {
            this.companyForm.reset();
        }
        this.dialogRef?.close(data);
        this.store.dispatch(companyActions.resetError({ error: undefined }));
        this.store.dispatch(companyActions.load());
    }

    clearStorage() {
        this.initialData = null;
    }

    createCompany() {
        const data = this.companyForm.value as CreateCompanyInput;
        console.log('Create', data);
        this.store.dispatch(companyActions.createOne({ company: { ...data, userId: data.userId } }));
        this.action$.pipe(ofType(companyActions.createOneSuccess), take(1)).subscribe(() => this.closeDialog());
    }
    updateCompany() {
        const data = this.companyForm.value;
        console.log('Update', data);
        this.store.dispatch(
            companyActions.updateOne({ companyId: this.currentId, company: { ...data, userId: data.userId } })
        );

        this.action$.pipe(ofType(companyActions.updateOneSuccess), take(1)).subscribe(() => this.closeDialog());
    }

    clear() {
        this.companyForm.reset();
    }
}
