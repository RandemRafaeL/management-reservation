import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { EmployeeType } from '../../../../graphql/_generated/types';
import { startWith, Subscription, switchMap } from 'rxjs';
import { ListSorterService } from '../../../templates/list-sorter/list-sorter.service';
import { KeyName } from '../../../templates/list-sorter/list-sorter.component';
import { ActivatedRoute } from '@angular/router';
import { FlatObject, flattenObject } from '../../../Helpers/form-generator/flat-list';
import { map } from 'rxjs/operators';
import { findParam } from '../../../Helpers/route-helpers';
import {
    ListEmployees_UserGQL,
    ListEmployees_UserQuery,
} from '../../../../graphql/employee/query/listEmployee.query.generated';
import { ListOfferForEmployeesGQL } from '../../../../graphql/offerForEmployee/query/listOfferForEmployee.query.generated';
import { ListViewService } from '../../../templates/listViewMenu/list-view.service';

@Component({
    selector: 'randem-frames-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.scss',
    providers: [ListSorterService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit, OnDestroy {
    constructor(
        private activatedRoute: ActivatedRoute,
        private listEmployees: ListEmployees_UserGQL,
        private listOfferForEmployeesGQL: ListOfferForEmployeesGQL,
        private listViewService: ListViewService
    ) {}

    employeeListWithCompanyName = signal<EmployeeType[]>([]);
    employeeListWithCompanyNameFiltered = signal<EmployeeType[] & Record<string, string>[]>([]);

    options: KeyName<ListEmployees_UserQuery['listEmployee_User'][number] & Record<string, unknown>>[] =
        getListSorterOptions(listSorter_optionsListEmployee, this.activatedRoute.snapshot.data['key']);

    listView$ = this.listViewService.viewType$;
    filterView$ = this.listViewService.filterSate$;

    subscription = new Subscription();

    ngOnInit() {
        console.log('data key', this.activatedRoute.snapshot);
        this.subscription.add(
            this.activatedRoute.paramMap //
                .pipe(
                    startWith(),
                    switchMap(() => this.loadListEmployees$())
                )
                .subscribe(data => {
                    const offerCompanyId = findParam(this.activatedRoute, 'offerCompanyId');

                    let flatEmployees!: FlatObject[];

                    if (offerCompanyId) {
                        this.listOfferForEmployeesGQL
                            .watch()
                            .valueChanges.pipe(
                                map(res =>
                                    res.data.listOfferForEmployees.filter(
                                        offer => offer.offerForCompany?.id === offerCompanyId
                                    )
                                )
                            )
                            .subscribe(offers => {
                                const employees = offers.map(offer => offer.employee?.id);

                                console.log('offers employee', offers, employees);

                                flatEmployees = data
                                    .filter(employee => employees.includes(employee.id))
                                    .map((el: Record<string, any>) => flattenObject(el));
                                this.employeeListWithCompanyName.set(flatEmployees as EmployeeType[]);
                            });
                    } else {
                        flatEmployees = data.map((el: Record<string, any>) => flattenObject(el));
                        this.employeeListWithCompanyName.set(flatEmployees as EmployeeType[]);
                    }
                })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSortedList($event: EmployeeType[] & Record<string, string>[]) {
        this.employeeListWithCompanyNameFiltered.set($event);
    }

    loadListEmployees$() {
        return this.listEmployees
            .watch()
            .valueChanges //
            .pipe(
                map(res => res.data.listEmployee_User as EmployeeType[]),
                map(employees => {
                    const companyId = findParam(this.activatedRoute, 'companyId');
                    if (companyId) {
                        return employees.filter(employee => employee.company?.id === companyId);
                    }
                    return employees;
                })
            );
    }
}

export function getListSorterOptions(
    listSorter_options: Record<
        string,
        KeyName<ListEmployees_UserQuery['listEmployee_User'][number] & Record<string, unknown>>[]
    >,
    key: string
) {
    if (!listSorter_options?.[key]) console.warn('getListSorter no key!, should be set key in routes');
    return listSorter_options?.[key] || listSorter_options['default'];
}

export const listSorter_optionsListEmployee: Record<
    string,
    KeyName<ListEmployees_UserQuery['listEmployee_User'][number] & Record<string, unknown>>[]
> = {
    'company_detail/employee': [
        { key: 'lastName', name: 'nazwisko' },
        { key: 'firstName', name: 'imię' },
        { key: 'email', name: 'email' },
        { key: 'phoneNumber', name: 'telefon' },
        { key: 'isActive', name: 'dostępność' },
        { key: 'position', name: 'stanowisko' },
    ],
    default: [
        { key: 'lastName', name: 'nazwisko' },
        { key: 'firstName', name: 'imię' },
        { key: 'company.name', name: 'firma' },
        { key: 'email', name: 'email' },
        { key: 'phoneNumber', name: 'telefon' },
        { key: 'isActive', name: 'dostępność' },
        { key: 'position', name: 'stanowisko' },
    ],
};
