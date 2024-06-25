import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { filter, Subscription, switchMap, tap } from 'rxjs';
import { CompanyItemState, selectCompanyById, selectCompanyError } from '../../../state/company/company.store';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { Location } from '@angular/common';

@Component({
    selector: 'randem-frames-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrl: './company-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DialogFormService, DialogConfirmService],
})
export class CompanyDetailComponent implements OnInit {
    constructor(
        private store: Store,
        public activatedRoute: ActivatedRoute,
        private location: Location
    ) {}

    subscription = new Subscription();

    company_ = signal<CompanyItemState | undefined>(undefined);

    ngOnInit() {
        this.subscription.add(
            this.store
                .select(selectCompanyError)
                .pipe(filter(err => !!err?.error))
                .subscribe({ error: err => console.error(err.error) })
        );

        this.subscription.add(
            this.activatedRoute.params //
                .pipe(
                    switchMap(({ companyId }) => this.store.select(selectCompanyById(companyId))),
                    filter(el => !!el)
                )
                .subscribe(company => {
                    console.log('[CompanyDetailComponent] company', company);
                    company ? this.company_.set(company) : this.location.back();
                })
        );
    }
}
