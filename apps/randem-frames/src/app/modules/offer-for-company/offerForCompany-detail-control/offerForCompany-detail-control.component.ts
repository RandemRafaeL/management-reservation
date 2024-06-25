import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { ListFormComplete } from '../../../templates/forms-auto-select/form-complete/form-complete.component';
import { map } from 'rxjs/operators';
import { ListOfferForCompanyGQL } from '../../../../graphql/offerForCompany/query/listOfferForCompany.query.generated';
import { findParam } from '../../../Helpers/route-helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteParamsService } from '../../../core/services/router/route-params.service';
import { OfferForEmployeeFormService } from '../../offerForEmployee/offerForEmployee-form/offerForEmployee-form.service';

@Component({
    selector: 'randem-frames-offer-for-company-detail-control',
    templateUrl: './offerForCompany-detail-control.component.html',
    styleUrl: './offerForCompany-detail-control.component.scss',
})
export class OfferForCompanyDetailControlComponent implements OnInit, OnDestroy {
    constructor(
        private listOfferForCompanyGQL: ListOfferForCompanyGQL,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private routeParamsService: RouteParamsService,
        private offerForEmployeeFormService: OfferForEmployeeFormService
    ) {}

    startValue!: string;

    optionActive!: { routerLink: string; label: string } | undefined;

    subscription = new Subscription();

    paramName = 'offerCompanyId';
    routerLinkPrefix = '/dashboard/offer/company-services';

    listOptions: { routerLink: string; label: string }[] = [
        { label: 'Szczegóły', routerLink: 'detail' },
        { label: 'Pracownicy', routerLink: 'employees' },
        // { label: 'Rezerwacje', routerLink: '' },
    ];

    offerForCompanyForm$: Observable<ListFormComplete[]> = this.listOfferForCompanyGQL.fetch().pipe(
        map(res =>
            res.data.listOffersForCompany
                .filter(offer => {
                    const companyId = res.data.listOffersForCompany.find(
                        _offer => _offer.id === findParam(this.activatedRoute, 'offerCompanyId')
                    )?.company?.id;
                    return offer.company?.id === companyId;
                })
                .map(offer => ({
                    id: offer.id as string,
                    name: offer?.customName || (offer.offer?.name as string),
                }))
        )
    );

    ngOnInit() {
        this.startValue = this.routeParamsService.params['offerCompanyId'];
        this.subscription.add(
            this.activatedRoute.params.subscribe(() => {
                this.designateOptionActive();
            })
        );

        this.offerForEmployeeFormService.appearance.offerForCompanyId.disabled = true;
    }

    ngOnDestroy(): void {
        this.offerForEmployeeFormService.appearance.offerForCompanyId.disabled = false;
    }

    selectOffer(offerId: string): void {
        const segments = this.activatedRoute.snapshot.pathFromRoot.flatMap(route =>
            route.url.map(segment => segment.toString())
        );
        segments[3] = offerId;

        console.log('segments', segments, offerId);
        this.router.navigate(segments).then();
    }

    navigateTo(path: string) {
        const offerId = findParam(this.activatedRoute, this.paramName);
        if (offerId) {
            console.log([this.routerLinkPrefix, offerId, path]);

            this.router.navigate([this.routerLinkPrefix, offerId, path]).then();
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
