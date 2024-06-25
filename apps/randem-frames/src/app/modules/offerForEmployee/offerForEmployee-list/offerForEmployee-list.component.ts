import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {
    ListOfferForEmployeesGQL,
    ListOfferForEmployeesQuery,
} from '../../../../graphql/offerForEmployee/query/listOfferForEmployee.query.generated';
import { findParam } from '../../../Helpers/route-helpers';
import { ListViewService } from '../../../templates/listViewMenu/list-view.service';
import { KeyName } from '../../../templates/list-sorter/list-sorter.component';
import { getListSorterOptions } from '../../employee/emloyee-list/employee-list.component';
import { EmployeeType } from '../../../../graphql/_generated/types';
import { ListSorterService } from '../../../templates/list-sorter/list-sorter.service';

@Component({
    selector: 'randem-frames-offer-for-employee-list',
    templateUrl: './offerForEmployee-list.component.html',
    styleUrl: './offerForEmployee-list.component.scss',
    providers: [ListSorterService],
})
export class OfferForEmployeeListComponent implements OnInit, OnDestroy {
    constructor(
        private activatedRoute: ActivatedRoute,
        private listOfferForEmployeesGQL: ListOfferForEmployeesGQL,
        private listViewService: ListViewService
    ) {}

    listView$ = this.listViewService.viewType$;
    filterView$ = this.listViewService.filterSate$;
    list$!: Observable<ListOfferForEmployeesQuery['listOfferForEmployees']>;
    list_ = signal<ListOfferForEmployeesQuery['listOfferForEmployees']>([]);
    listFiltered_ = signal<ListOfferForEmployeesQuery['listOfferForEmployees']>([]);

    options = getListSorterOptions(listSorter_optionsListOfferForEmployee, this.activatedRoute.snapshot.data['key']);

    subscription = new Subscription();

    ngOnInit() {
        this.list$ = this.activatedRoute.paramMap.pipe(
            switchMap(() =>
                this.listOfferForEmployeesGQL.watch().valueChanges.pipe(
                    map(res => res.data.listOfferForEmployees),
                    map(offerEmployees => {
                        const employeeId = findParam(this.activatedRoute, 'employeeId');
                        if (employeeId) {
                            return offerEmployees.filter(offers => offers.employee?.id === employeeId);
                        }
                        return offerEmployees;
                    }),
                    tap(list => this.list_.set(list))
                )
            )
        );

        this.subscription.add(this.list$.subscribe());
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    onSortedList($event: EmployeeType[] & Record<string, string>[]) {
        this.listFiltered_.set($event);
    }
}

export const listSorter_optionsListOfferForEmployee: Record<
    string,
    KeyName<ListOfferForEmployeesQuery['listOfferForEmployees'][number] & Record<string, unknown>>[]
> = {
    'company_detail/offer': [
        { key: 'offerForCompany.customName', name: 'nazwa usługi' },
        { key: 'offerForCompany.company.name', name: 'firma' },
    ],
    default: [
        { key: 'offerForCompany.customName', name: 'nazwa usługi' },
        { key: 'employee.firstName', name: 'imię pracownika' },
        { key: 'employee.lastName', name: 'nazwisko pracownika' },
        { key: 'offerForCompany.company.name', name: 'firma' },
        // { key: 'email', name: 'email' },
        // { key: 'phoneNumber', name: 'telefon' },
        // { key: 'isActive', name: 'dostępność' },
        // { key: 'position', name: 'stanowisko' },
    ],
};
