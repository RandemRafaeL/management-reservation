import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    GetOfferForCompanyGQL,
    GetOfferForCompanyQuery,
} from '../../../../graphql/offerForCompany/query/getOfferForCompany.query.generated';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'randem-frames-offer-for-company-detail',
    templateUrl: './offerForCompany-detail.component.html',
    styleUrl: './offerForCompany-detail.component.css',
})
export class OfferForCompanyDetailComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private getOfferForCompanyGQL: GetOfferForCompanyGQL
    ) {}

    subscription = new Subscription();

    offerCompany$!: Observable<GetOfferForCompanyQuery['getOfferForCompany']>;

    ngOnInit() {
        this.offerCompany$ = this.activatedRoute.params.pipe(
            switchMap(({ offerCompanyId }) =>
                this.getOfferForCompanyGQL
                    .fetch({
                        getOfferForCompanyId: offerCompanyId,
                    })
                    .pipe(map(res => res.data.getOfferForCompany))
            )
        );
    }
}
