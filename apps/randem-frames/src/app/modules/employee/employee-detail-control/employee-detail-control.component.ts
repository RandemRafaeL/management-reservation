import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ListFormComplete } from '../../../templates/forms-auto-select/form-complete/form-complete.component';
import { findParam } from '../../../Helpers/route-helpers';
import { map } from 'rxjs/operators';
import { ListEmployees_UserGQL } from '../../../../graphql/employee/query/listEmployee.query.generated';
import { OfferForEmployeeFormService } from '../../offerForEmployee/offerForEmployee-form/offerForEmployee-form.service';

@Component({
    selector: 'randem-frames-employee-detail-control',
    templateUrl: './employee-detail-control.component.html',
    styleUrl: './employee-detail-control.component.scss',
})
export class EmployeeDetailControlComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private listEmployees: ListEmployees_UserGQL,
        private offerForEmployeeFormService: OfferForEmployeeFormService
    ) {}

    startValue!: string;

    optionActive!: { routerLink: string; label: string } | undefined;

    subscription = new Subscription();

    paramName = 'employeeId';
    routerLinkPrefix = '/dashboard/employee';
    listOptions: { routerLink: string; label: string }[] = [
        { label: 'Szczegóły', routerLink: 'detail' },
        // { label: 'Pracownicy', routerLink: 'employees' },
        { label: 'Usługi', routerLink: 'offer' },
    ];

    employeeListForm$: Observable<ListFormComplete[]> = this.listEmployees.fetch().pipe(
        map(res => res.data.listEmployee_User),
        map(employees =>
            employees.map(employee => ({
                id: employee.id as string,
                name: `${employee.lastName} ${employee.firstName}`,
            }))
        )
    );

    ngOnInit() {
        this.activatedRoute.params.subscribe(() => {
            this.designateOptionActive();
            this.startValue = findParam(this.activatedRoute, 'employeeId');
            console.log('startValue', this.startValue);

            this.offerForEmployeeFormService.appearance.employeeId.disabled = true;
        });
    }

    ngOnDestroy() {
        this.offerForEmployeeFormService.init();
        console.log('reset', this.offerForEmployeeFormService.appearance.employeeId.disabled);
        console.log('reset', this.offerForEmployeeFormService.appearance.employeeId);
    }

    selectCompany(employeeId: string): void {
        const segments = this.activatedRoute.snapshot.pathFromRoot.flatMap(route =>
            route.url.map(segment => segment.toString())
        );
        segments[2] = employeeId;
        this.router.navigate(segments).then();
    }

    navigateTo(path: string) {
        const employeeId = findParam(this.activatedRoute, this.paramName);
        console.log(this.routerLinkPrefix, employeeId, path);

        if (employeeId) {
            this.router.navigate([this.routerLinkPrefix, employeeId, path]).then();
        }
    }

    designateOptionActive() {
        const employeeId = findParam(this.activatedRoute, this.paramName);
        this.optionActive = this.listOptions.find(
            item => this.router.url === `${this.routerLinkPrefix}/${employeeId}/${item.routerLink}`
        );
        return this.optionActive;
    }
}
