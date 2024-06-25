import { Component, OnInit } from '@angular/core';
import { ListCustomerGQL, ListCustomerQuery } from '../../../graphql/customer/query/listCustomer.query.generated';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogFormService } from '../../templates/dialog-modal/dialog-form/dialog-form.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { DialogConfirmService } from '../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { DeleteCustomerGQL } from '../../../graphql/customer/mutate/deleteCustomer.mutate.generated';

@Component({
    selector: 'randem-frames-customer',
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss',
    providers: [DialogFormService, DialogConfirmService],
})
export class CustomerComponent implements OnInit {
    constructor(
        private listCustomerGQL: ListCustomerGQL,
        private dialogFormService: DialogFormService,
        private dialogConfirmService: DialogConfirmService,
        private deleteCustomerGQL: DeleteCustomerGQL
    ) {}

    listCustomer$!: Observable<ListCustomerQuery['listCustomer']>;

    ngOnInit() {
        this.listCustomer$ = this.listCustomerGQL //
            .watch()
            .valueChanges.pipe(map(res => res.data.listCustomer));
    }

    openDialogCreate() {
        this.dialogFormService.openFormDialog(CustomerFormComponent);
    }

    updateCustomer(id: string) {
        this.dialogFormService.openFormDialog<CustomerFormComponent['dialogData']>(CustomerFormComponent, {
            customerId: id,
        });
    }

    deleteCustomer(customerId: string) {
        if (!customerId) {
            console.error('company.id is undefined');
            return;
        }
        this.dialogConfirmService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                switchMap(() =>
                    this.deleteCustomerGQL.mutate(
                        { deleteCustomerId: customerId },
                        {
                            refetchQueries: [
                                {
                                    query: this.listCustomerGQL.document,
                                },
                            ],
                        }
                    )
                )
            )

            .subscribe({
                next: () => console.log('Delete sending'),
                // error: err => console.error(err),
            });
    }
}
