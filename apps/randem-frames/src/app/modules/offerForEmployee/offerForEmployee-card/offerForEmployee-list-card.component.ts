import { Component, Input } from '@angular/core';
import {
    ListOfferForEmployeesGQL,
    ListOfferForEmployeesQuery,
} from '../../../../graphql/offerForEmployee/query/listOfferForEmployee.query.generated';
import { DeleteOfferForEmployeeGQL } from '../../../../graphql/offerForEmployee/mutate/deleteOfferForEmployee.mutate.generated';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { OfferForEmployeeFormComponent } from '../offerForEmployee-form/offerForEmployee-form.component';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { filter, switchMap } from 'rxjs';
import { StateValueTypes } from '../../../core/services/server-state/server-state.types';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../../state/user/_user.store';
import { map } from 'rxjs/operators';

@Component({
    selector: 'randem-frames-offer-for-employee-list-card',
    templateUrl: './offerForEmployee-list-card.component.html',
    styleUrl: './offerForEmployee-list-card.component.scss',
    providers: [DialogConfirmService, DialogFormService],
})
export class OfferForEmployeeListCardComponent {
    constructor(
        private deleteOfferForEmployeeGQLOfferForEmployeeGQL: DeleteOfferForEmployeeGQL,
        private dialogFormService: DialogFormService,
        private dialogConfirmService: DialogConfirmService,
        private listOfferForEmployeesGQL: ListOfferForEmployeesGQL,
        private store: Store
    ) {}

    @Input() offerForEmployee!: ListOfferForEmployeesQuery['listOfferForEmployees'][number];
    @Input() contentView: StateValueTypes['LIST_VIEW'] = 'full';

    userRole$ = this.store.select(selectUserData).pipe(map(user => user.role));

    update(offerForEmployeeId: string) {
        this.dialogFormService.openFormDialog<OfferForEmployeeFormComponent['dialogData']>(
            OfferForEmployeeFormComponent,
            { offerForEmployeeId: offerForEmployeeId }
        );
    }

    delete(offerForEmployeeId: string) {
        if (!offerForEmployeeId) {
            console.error('company.id is undefined');
            return;
        }
        this.dialogConfirmService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                switchMap(() =>
                    this.deleteOfferForEmployeeGQLOfferForEmployeeGQL.mutate(
                        {
                            deleteOfferForEmployeeId: offerForEmployeeId,
                        },
                        {
                            refetchQueries: [
                                {
                                    query: this.listOfferForEmployeesGQL.document,
                                },
                            ],
                        }
                    )
                )
            )

            .subscribe({
                next: res => console.log('Deleted', res.data?.deleteOfferForEmployee),
                error: err => console.error(err),
            });
    }
}
