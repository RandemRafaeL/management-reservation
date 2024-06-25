import { Component, OnInit } from '@angular/core';
import { GetAllOffersGQL } from '../../../../graphql/offer/query/getOffers.query.generated';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OfferType } from '../../../../graphql/_generated/types';

@Component({
    selector: 'randem-frames-offer-detail',
    templateUrl: './offer-detail.component.html',
    styleUrl: './offer-detail.component.scss',
})
export class OfferDetailComponent implements OnInit {
    constructor(
        private getAllOffersGQL: GetAllOffersGQL,
        private activatedRoute: ActivatedRoute
    ) {}

    listOffer$ = this.getAllOffersGQL.fetch().pipe(map(req => req.data.getAllOffers));
    currentOfferId$ = this.activatedRoute.params.pipe(map(param => param['id']));
    offer$!: Observable<OfferType>;

    ngOnInit() {
        this.offer$ = this.currentOfferId$.pipe(
            switchMap(id =>
                this.listOffer$ //
                    .pipe(
                        map(listOffer =>
                            listOffer //
                                .find(offer => offer.id === id)
                        )
                    )
            )
        ) as Observable<OfferType>;

        this.offer$.subscribe(console.log);
    }
}
