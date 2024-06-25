import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { UserRoleEnum } from '../../../../graphql/_generated/types';
import { companyActions, CompanyItemState } from '../../../state/company/company.store';
import { filter, Observable, Subscription, tap } from 'rxjs';
import { BreakpointService, BreakPointsList } from '../../../core/services/breakpoints/breakpoint.service';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { Store } from '@ngrx/store';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { HttpErrorService } from '../../../http-services/http-error.service';

@Component({
    selector: 'randem-frames-company-card',
    templateUrl: './company-card.component.html',
    styleUrl: './company-card.component.scss',
    providers: [DialogFormService, DialogConfirmService],
})
export class CompanyCardComponent implements OnDestroy {
    @Input() company!: CompanyItemState | any;

    constructor(
        private breakpointService: BreakpointService,
        private dialogConfirmService: DialogConfirmService,
        private dialogFormService: DialogFormService,
        private store: Store,
        private httpErrorService: HttpErrorService
    ) {}

    breakpoint$: Observable<BreakPointsList> = this.breakpointService.getBreakpoint$();
    dialogFormCompany!: DialogRef<unknown, CompanyFormComponent>;
    resClass = signal('');
    subscription = new Subscription();

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    dialogOpen(value: CompanyItemState | null = null) {
        this.dialogFormService.openFormDialog(CompanyFormComponent, value);
    }

    deleteCompanyConfirm(companyId?: string) {
        if (!companyId) {
            console.error('company.id is undefined');
            return;
        }
        this.dialogConfirmService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                tap(() => this.store.dispatch(companyActions.deleteOne({ companyId: companyId })))
            )

            .subscribe({
                next: () => console.log('Delete sending'),
                // error: err => console.error(err),
            });
    }

    deleteCompany(id: string) {
        if (id) {
            this.store.dispatch(companyActions.deleteOne({ companyId: id }));
        }
    }

    parseUserRole(user: UserRoleEnum | undefined) {
        if (!user) return;
        const parseUserData: Record<UserRoleEnum, string> = {
            USER: 'użytkownik',
            ADMIN: 'administrator',
            OWNER: 'właściciel',
            EMPLOYEE: 'pracownik',
        };
        return parseUserData[user] as string;
    }
}
