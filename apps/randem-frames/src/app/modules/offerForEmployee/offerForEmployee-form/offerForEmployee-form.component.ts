import { Component, Inject, OnInit, Optional } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { OfferForEmployeeFormService } from './offerForEmployee-form.service';
import { GetOfferForEmployeeGQL } from '../../../../graphql/offerForEmployee/query/getOfferForEmployee.query.generated';
import { combineLatestWith, Observable, Subscription, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListOfferForCompanyGQL } from '../../../../graphql/offerForCompany/query/listOfferForCompany.query.generated';
import { CreateOfferForEmployeeGQL } from '../../../../graphql/offerForEmployee/mutate/createOfferForEmployee.mutate.generated';
import { UpdateOfferForEmployeeGQL } from '../../../../graphql/offerForEmployee/mutate/updateOfferForEmployee.mutate.generated';
import {
    ListOfferForEmployeesGQL,
    ListOfferForEmployeesQuery,
} from '../../../../graphql/offerForEmployee/query/listOfferForEmployee.query.generated';
import { ListEmployees_UserGQL } from '../../../../graphql/employee/query/listEmployee.query.generated';
import { RouteParamsService } from '../../../core/services/router/route-params.service';

export type OfferForEmployeeFormDialogData = {
    offerForEmployeeId: string;
};

@Component({
    selector: 'randem-frames-offer-for-employee-form',
    templateUrl: './offerForEmployee-form.component.html',
    styleUrl: './offerForEmployee-form.component.scss',
})
export class OfferForEmployeeFormComponent implements OnInit {
    constructor(
        @Optional()
        public dialogRef: DialogRef<OfferForEmployeeFormDialogData, OfferForEmployeeFormComponent>,
        @Inject(DIALOG_DATA) public dialogData: OfferForEmployeeFormDialogData,
        private offerForEmployeeFormService: OfferForEmployeeFormService,
        private getOfferForEmployeeGQL: GetOfferForEmployeeGQL,
        private createOfferForEmployeeGQL: CreateOfferForEmployeeGQL,
        private updateOfferForEmployeeGQL: UpdateOfferForEmployeeGQL,
        private listEmployeesGQL: ListEmployees_UserGQL, // TODO ujednolicić nazwę
        private listOfferForCompanyGQL: ListOfferForCompanyGQL,
        private listOfferForEmployeesGQL: ListOfferForEmployeesGQL,
        private routeParamsService: RouteParamsService
    ) {}

    appearance = this.offerForEmployeeFormService.appearance;
    formGroup = this.offerForEmployeeFormService.autoFormGroup;

    subscription = new Subscription();

    listOfferForEmployee$?: Observable<ListOfferForEmployeesQuery['listOfferForEmployees']>;

    ngOnInit() {
        this.formGroup.markAsUntouched();

        const { employeeId, offerCompanyId } = this.routeParamsService.params;
        console.log('PARAMS', employeeId, offerCompanyId);

        this.listOfferForEmployee$ = this.listOfferForEmployeesGQL
            .fetch()
            .pipe(map(res => res.data.listOfferForEmployees));

        const { offerForEmployeeId } = this.dialogData;
        // Update formGroup
        if (offerForEmployeeId) {
            this.getOfferForEmployeeGQL
                .fetch({ getOfferForEmployeeId: offerForEmployeeId }) //
                .pipe(
                    tap(res => console.log(res)),
                    map(res => res.data?.getOfferForEmployee)
                )
                .subscribe(offer => {
                    console.log('offerForEmployee', offer);

                    this.formGroup.patchValue({
                        employeeId: offer.employee?.id,
                        offerForCompanyId: offer.offerForCompany?.id,
                    });
                });
        } else {
            this.formGroup.patchValue({
                employeeId,
                offerForCompanyId: offerCompanyId,
            });
        }

        if (this.appearance.employeeId.controlType === 'select') {
            const employeeIdsFromOfferEmployee$ = this.listOfferForEmployee$.pipe(
                map(offers => Array.from(new Set(offers.map(offer => offer.employee?.id))))
            );

            this.appearance.employeeId.select.data$ = this.listEmployeesGQL
                .fetch() //
                .pipe(
                    combineLatestWith(employeeIdsFromOfferEmployee$),
                    map(([res, ids]) =>
                        res.data.listEmployee_User
                            .filter(employee => !ids.includes(employee.id) || employee.id === employeeId)
                            .map(employee => ({
                                id: employee.id,
                                name: `${employee.lastName} ${employee.firstName}`,
                            }))
                    )
                );
        }

        if (this.appearance.offerForCompanyId.controlType === 'select') {
            const offerCompanyIdsFromOfferEmployee$ = this.listOfferForEmployee$.pipe(
                map(offers =>
                    Array.from(
                        new Set(
                            offers
                                .filter(offer => offer.employee?.id === employeeId)
                                .map(offer => offer.offerForCompany?.id)
                        )
                    )
                )
            );

            offerCompanyIdsFromOfferEmployee$.subscribe(console.log);

            this.appearance.offerForCompanyId.select.data$ = this.listOfferForCompanyGQL
                .fetch() //
                .pipe(
                    combineLatestWith(offerCompanyIdsFromOfferEmployee$),
                    map(([res, ids]) =>
                        res.data.listOffersForCompany
                            .filter(offer => !ids.includes(offer.id)) // TODO do poprawki
                            .map(offer => ({
                                id: offer.id,
                                name: offer.customName || offer.offer?.name,
                            }))
                    )
                );
        }
    }

    close() {
        this.dialogRef.close();
    }

    create() {
        this.createOfferForEmployeeGQL //
            .mutate(
                { createOfferForEmployeeInput: this.formGroup.value },
                {
                    refetchQueries: [{ query: this.listOfferForEmployeesGQL.document }],
                }
            )
            .subscribe(res => {
                console.log('Create offerForEmployee', res);
                this.close();
            });
    }

    update() {
        const { offerForEmployeeId } = this.dialogData;
        if (!offerForEmployeeId) {
            console.error('cant update id is undefined');
            return;
        }
        this.updateOfferForEmployeeGQL //
            .mutate(
                {
                    updateOfferForEmployeeInput: this.formGroup.value,
                    updateOfferForEmployeeId: offerForEmployeeId,
                },
                {
                    refetchQueries: [{ query: this.listOfferForEmployeesGQL.document }],
                }
            )
            .subscribe(res => {
                console.log('Update offerForEmployee', res);
                this.close();
            });
    }
}
