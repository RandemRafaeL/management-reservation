import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { ListFormComplete } from '../../../templates/forms-auto-select/form-complete/form-complete.component';
import { selectAllCompanies, selectCompanyById } from '../../../state/company/company.store';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { findParam } from '../../../Helpers/route-helpers';
import { EmployeeFormService } from '../../employee/employe-form/employee-form.service';
import { OfferForCompanyFormService } from '../../offer-for-company/offerForCompany-form/offer-for-company-form.service';

@Component({
    selector: 'randem-frames-company-detail-control',
    templateUrl: './company-detail-control.component.html',
    styleUrl: './company-detail-control.component.scss',
})
export class CompanyDetailControlComponent implements OnInit, OnDestroy {
    constructor(
        private store: Store,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private employeeFormService: EmployeeFormService,
        private offerForCompanyFormService: OfferForCompanyFormService
    ) {}

    startValue!: string;

    optionActive!: { routerLink: string; label: string } | undefined;

    subscription = new Subscription();

    paramName = 'companyId';
    routerLinkPrefix = '/dashboard/company';
    listOptions: { routerLink: string; label: string }[] = [
        { label: 'Szczegóły', routerLink: 'detail' },
        { label: 'Pracownicy', routerLink: 'employees' },
        { label: 'Usługi', routerLink: 'services' },
    ];

    companyListForm$: Observable<ListFormComplete[]> = this.store.select(selectAllCompanies).pipe(
        map(companies =>
            companies.map(company => ({
                id: company.id as string,
                name: company.name,
            }))
        )
    );

    ngOnInit() {
        this.subscription.add(
            this.activatedRoute.params //
                .pipe(
                    switchMap(({ companyId }) => this.store.select(selectCompanyById(companyId))),
                    filter(el => !!el)
                )
                .subscribe(company => {
                    this.designateOptionActive();
                    this.startValue = `${company?.id}`;

                    this.employeeFormService.employeeFormInit //
                        .modify(form => ({ ...form, companyId: this.startValue }));
                    this.employeeFormService.employeeFormAppearance.companyId.disabled = true;

                    this.offerForCompanyFormService.offerForCompanyFormInit //
                        .modify(form => ({ ...form, companyId: this.startValue }));
                    this.offerForCompanyFormService.offerForCompanyAppearance.companyId.disabled = true;
                })
        );
    }

    ngOnDestroy() {
        this.employeeFormService.employeeFormInit.reset();
        this.offerForCompanyFormService.offerForCompanyFormInit.reset();
        // ??? TODO sprawdzić
        this.employeeFormService.employeeFormAppearance.companyId.disabled = false;
        this.offerForCompanyFormService.offerForCompanyAppearance.companyId.disabled = false;

        this.subscription.unsubscribe();
    }

    selectCompany(companyId: string): void {
        const segments = this.activatedRoute.snapshot.pathFromRoot.flatMap(route =>
            route.url.map(segment => segment.toString())
        );
        segments[2] = companyId;

        this.router.navigate(segments).then();
    }

    navigateTo(path: string) {
        const companyId = findParam(this.activatedRoute, this.paramName);
        if (companyId) {
            this.router.navigate([this.routerLinkPrefix, companyId, path]).then();
        }
    }

    designateOptionActive() {
        const companyId = findParam(this.activatedRoute, this.paramName);
        this.optionActive = this.listOptions.find(
            item => this.router.url === `${this.routerLinkPrefix}/${companyId}/${item.routerLink}`
        );
        return this.optionActive;
    }
}
