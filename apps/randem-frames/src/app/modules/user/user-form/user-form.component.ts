import { Component, Inject, OnInit, Optional } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { UserFormService } from './user-form.service';
import { CreateUserGQL } from '../../../../graphql/user/createUser.mutate.generated';
import { HttpErrorService } from '../../../http-services/http-error.service';
import { distinctUntilChanged, Observable, of, switchMap, timer } from 'rxjs';
import { UserRoleEnum, UserType } from '../../../../graphql/_generated/types';
import { GetUserGQL } from '../../../../graphql/user/getUser.query.generated';
import { catchError, map } from 'rxjs/operators';
import { ListUserGQL } from '../../../../graphql/user/listUser.query.generated';
import { UpdateUserGQL } from '../../../../graphql/user/updateUser.mutation.generated';
import { UniqueUsernameGQL } from '../../../../graphql/user/uniqueUsername.query.generated';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

export type UserFormDialogData = { userId?: string | null };

@Component({
    selector: 'randem-frames-user-form',
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
    constructor(
        @Optional() public dialogRef: DialogRef<UserFormDialogData, UserFormComponent>,
        @Inject(DIALOG_DATA) public dialogData: UserFormDialogData,
        private userFormService: UserFormService,
        private createUserGQL: CreateUserGQL,
        private updateUserGQL: UpdateUserGQL,
        private getUserGQL: GetUserGQL,
        private listUserGQL: ListUserGQL,
        private uniqueUsernameGQL: UniqueUsernameGQL,
        private error: HttpErrorService // TODO dokończyć
    ) {}

    userFormAppearance = this.userFormService.userFormAppearance;

    userFormGroup = this.userFormService.userFormGroup;

    ngOnInit() {
        this.userFormGroup.statusChanges.pipe(distinctUntilChanged()).subscribe({
            next: () =>
                console.log(
                    'errors ',
                    this.userFormGroup.controls['username'].errors,
                    this.userFormGroup.controls['username'].updateOn,
                    this.userFormGroup.updateOn
                ),
        });

        const { userId } = this.dialogData;
        if (userId) {
            this.getUserGQL
                .fetch({ userId: userId })
                .pipe(map(res => res.data?.getUser))
                .subscribe(user => this.userFormGroup.patchValue(user as UserType));
        } else {
            this.userFormGroup.controls['username'].addAsyncValidators(
                _uniqueUsernameValidator(this.uniqueUsernameGQL, userId ? userId : null)
            );
        }

        if (this.userFormAppearance.role.controlType === 'select') {
            const roleList: { id: UserRoleEnum; name: string }[] = [
                { id: UserRoleEnum.Admin, name: 'Administrator' },
                { id: UserRoleEnum.Owner, name: 'Właściciel' },
                { id: UserRoleEnum.Employee, name: 'Pracownik' },
                { id: UserRoleEnum.User, name: 'Użytkownik' },
            ];

            this.userFormAppearance.role.select.data$ = of(roleList);
        }
    }

    createUser() {
        console.log('createUser');
        const createUser = this.userFormGroup.value;
        this.createUserGQL
            .mutate(
                { createUserInput: { ...createUser } },
                {
                    refetchQueries: [
                        {
                            query: this.listUserGQL.document,
                        },
                    ],
                }
            )
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of(err);
                })
            ) //
            .subscribe({
                next: () => this.closeDialog(),
                error: error => {
                    console.log('GraphQL Error:', error);
                    // console.log(JSON.parse(error.message));
                    this.error.handleGqlError(error);
                    // console.error('GraphQL Error:', JSON.parse(error.message));
                },
            });
    }

    updateUser() {
        const { userId } = this.dialogData;
        if (userId) {
            this.updateUserGQL
                .mutate({ updateUserId: userId, updateUserInput: this.userFormGroup.value })
                .pipe(map(res => res.data?.updateUser))
                .subscribe(resUser => console.log('update user', resUser));
        }
    }

    closeDialog() {
        this.userFormGroup.reset();
        this.dialogRef.close();
    }
}

export function _uniqueUsernameValidator(
    uniqueUsernameGQL: UniqueUsernameGQL,
    userId?: string | null
): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
            return of(null);
        }

        return timer(600).pipe(
            switchMap(() => {
                return uniqueUsernameGQL.fetch({ username: control.value, userId }).pipe(
                    map(res => {
                        const isAvailable = res.data.uniqueUsername;
                        return isAvailable ? null : { nonUniqueUsername: true };
                    }),
                    catchError(() => of({ nonUniqueUsername: true }))
                );
            })
        );
    };
}
