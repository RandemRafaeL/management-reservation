import { Component, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CompanyItemState, selectAllCompanies } from '../../../state/company/company.store';

@Component({
    selector: 'randem-frames-company-list',
    templateUrl: './company-list.component.html',
    styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit {
    constructor(private store: Store) {}

    companyList = signal<CompanyItemState[]>([]);

    subscription = new Subscription();

    ngOnInit() {
        this.subscription.add(
            this.store
                .select(selectAllCompanies) //
                .subscribe(companies => this.companyList.set(companies))
        );
    }
}
