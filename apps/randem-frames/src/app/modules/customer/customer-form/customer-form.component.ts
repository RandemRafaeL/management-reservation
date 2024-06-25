import { Component, Inject, OnInit, Optional } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CustomerType } from '../../../../graphql/_generated/types';
import { CustomerComponent } from '../customer.component';
import { CustomerFormService } from './customer-form.service';
import { map } from 'rxjs/operators';
import { GetCustomerGQL } from '../../../../graphql/customer/query/getCustomer.query.generated';
import { CreateCustomerGQL } from '../../../../graphql/customer/mutate/createCustomer.mutate.generated';
import { UpdateCustomerGQL } from '../../../../graphql/customer/mutate/updateCustomer.mutate.generated';
import { ListCustomerGQL } from '../../../../graphql/customer/query/listCustomer.query.generated';

@Component({
    selector: 'randem-frames-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent implements OnInit {
    constructor(
        @Optional() public dialogRef: DialogRef<CustomerType, CustomerComponent>,
        @Inject(DIALOG_DATA) public dialogData: { customerId: string | null },
        private customerFormService: CustomerFormService,
        private getCustomerGQL: GetCustomerGQL,
        private createCustomerGQL: CreateCustomerGQL,
        private updateCustomerGQL: UpdateCustomerGQL,
        private listCustomerGQL: ListCustomerGQL
    ) {}

    customerAppearance = this.customerFormService.customerAppearance;
    customerFromGroup = this.customerFormService.customerFormGroup;

    ngOnInit() {
        if (this.dialogData.customerId) {
            this.getCustomerGQL
                .fetch()
                .pipe(map(res => res.data.getCustomer))
                .subscribe(customer => this.customerFromGroup.patchValue(customer));
        }
    }

    create() {
        this.createCustomerGQL
            .mutate(
                { createCustomerInput: this.customerFromGroup.value },
                {
                    refetchQueries: [
                        {
                            query: this.listCustomerGQL.document,
                        },
                    ],
                }
            )
            .subscribe(() => this.close());
    }

    update() {
        if (!this.dialogData.customerId) {
            console.warn('customerId id is null');
            return;
        }

        this.updateCustomerGQL
            .mutate(
                { updateCustomerId: this.dialogData.customerId, updateCustomerInput: this.customerFromGroup.value },
                {
                    refetchQueries: [
                        {
                            query: this.listCustomerGQL.document,
                        },
                    ],
                }
            )
            .subscribe(() => this.close());
    }

    close() {
        this.customerFromGroup.reset();
        this.dialogRef.close();
    }
}
