import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { CreateEmployeeInput, EmployeeType, UpdateEmployeeInput } from '../../../../graphql/_generated/types';
import { EmployeeFormService } from './employee-form.service';
import { Subscription, tap } from 'rxjs';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { map } from 'rxjs/operators';
import { GetEmployeeGQL } from '../../../../graphql/employee/query/getEmployee.quey.generated';
import { ListCompanyForUserGQL } from '../../../../graphql/company/listCompanyUser.query.generated';
import { CreateEmployeeGQL } from '../../../../graphql/employee/mutate/createEmployee.mutate.generated';
import { UpdateEmployeeGQL } from '../../../../graphql/employee/mutate/updateEmployee.mutate.generated';
import { ListEmployees_UserGQL } from '../../../../graphql/employee/query/listEmployee.query.generated';

@Component({
    selector: 'randem-frames-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
    constructor(
        @Optional() public dialogRef: DialogRef<EmployeeType, EmployeeFormComponent>,
        @Inject(DIALOG_DATA) public dialogData: { employeeId: string | null },
        private employeeFormService: EmployeeFormService,
        private getEmployeeGQL: GetEmployeeGQL,
        private listCompanyGQL: ListCompanyForUserGQL,
        private createEmployeeGQL: CreateEmployeeGQL,
        private updateEmployeeGQL: UpdateEmployeeGQL,
        private listEmployeesGQL: ListEmployees_UserGQL
    ) {}

    employeeFormAppearance = this.employeeFormService.employeeFormAppearance;
    employeeFormGroup = this.employeeFormService.employeeFormGroup;

    subscription = new Subscription();

    ngOnInit() {
        const { employeeId } = this.dialogData;
        if (employeeId) {
            this.getEmployeeGQL
                .fetch({ employeeId })
                .pipe(map(res => res.data.getEmployee))
                .subscribe(employee => {
                    const employeeForm = { ...employee, companyId: employee?.company?.id };
                    console.log('OPEN DIALOG UPDATE', employeeForm, employee?.company?.id);
                    this.employeeFormGroup.patchValue(employeeForm);
                });
        } else {
            this.employeeFormGroup.patchValue(this.employeeFormService.employeeFormInit.value);
        }

        if (this.employeeFormAppearance.companyId.controlType === 'select') {
            this.employeeFormAppearance.companyId.select.data$ = this.listCompanyGQL //
                .fetch()
                .pipe(
                    map(res =>
                        res.data.listCompanyForUser.map(company => ({
                            id: company.id,
                            name: company.name,
                        }))
                    ),
                    tap(data => console.log('companies', data))
                );
        }
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    create() {
        const createEmployeeInput: CreateEmployeeInput = this.employeeFormGroup.value;
        this.createEmployeeGQL
            .mutate(
                { createEmployeeInput },
                {
                    refetchQueries: [
                        {
                            query: this.listEmployeesGQL.document,
                        },
                    ],
                }
            )
            .subscribe(res => {
                console.log('Employee addOne', res);
                this.close();
            });
    }

    update() {
        const { employeeId } = this.dialogData;
        if (!employeeId) {
            console.error('Employee form missing id');
            return;
        }
        console.log('Employee id: ', employeeId);

        const updateEmployeeInput: UpdateEmployeeInput = this.employeeFormGroup.value;

        this.updateEmployeeGQL.mutate({ updateEmployeeId: employeeId, updateEmployeeInput }).subscribe({
            next: () => {
                console.log('Update successful');
                this.close();
            },
            error: error => console.error('Update failed', error),
        });
    }

    cleanForm() {
        this.employeeFormGroup.reset();
    }

    checkForm() {
        this.employeeFormGroup.markAllAsTouched();
    }

    close() {
        this.cleanForm();
        this.dialogRef?.close();
    }
}
