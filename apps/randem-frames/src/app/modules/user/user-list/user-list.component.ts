import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserRoleEnum } from '../../../../graphql/_generated/types';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { DeleteUserGQL } from '../../../../graphql/user/deleteUser.mutate.generated';
import { ListUserGQL, ListUserQuery } from '../../../../graphql/user/listUser.query.generated';

@Component({
    selector: 'randem-frames-user-list',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    providers: [DialogFormService, DialogConfirmService],
})
export class UserListComponent implements OnInit {
    constructor(
        private listUserGQL: ListUserGQL,
        private activatedRoute: ActivatedRoute,
        private dialogFormService: DialogFormService,
        private dialogConfirmService: DialogConfirmService,
        private deleteUserGQL: DeleteUserGQL
    ) {}

    userList$!: Observable<ListUserQuery['listUsers']>;

    ngOnInit() {
        this.userList$ = this.activatedRoute.paramMap.pipe(
            switchMap(() =>
                this.listUserGQL
                    .watch() //
                    .valueChanges.pipe(map(res => res.data.listUsers))
            )
        );
    }

    openDialogCreate() {
        this.dialogFormService.openFormDialog(UserFormComponent);
    }

    updateUser(id: string) {
        this.dialogFormService.openFormDialog<UserFormComponent['dialogData']>(UserFormComponent, { userId: id });
    }

    deleteUser(id: string) {
        return this.dialogConfirmService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                switchMap(() =>
                    this.deleteUserGQL
                        .mutate({ deleteUserId: id }, { refetchQueries: [{ query: this.listUserGQL.document }] }) //
                        .pipe(map(res => res.data?.deleteUser))
                )
            )
            .subscribe(resUser => console.log(resUser));
    }
}

@Pipe({
    name: 'roleName',
})
export class RoleNamePipe implements PipeTransform {
    private roleNames = {
        [UserRoleEnum.Admin]: 'Administrator',
        [UserRoleEnum.Employee]: 'Pracownik',
        [UserRoleEnum.Owner]: 'Właściciel',
        [UserRoleEnum.User]: 'Użytkownik',
    };

    transform(value: UserRoleEnum): string {
        return this.roleNames[value] || 'Nieznana rola';
    }
}
