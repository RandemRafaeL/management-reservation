import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import {
    ListOfferForCompanyGQL,
    ListOfferForCompanyQuery,
} from '../../../../graphql/offerForCompany/query/listOfferForCompany.query.generated';
import { DeleteOfferForCompanyGQL } from '../../../../graphql/offerForCompany/mutate/deleteOfferForCompany.mutate.generated';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { debounceTime, Observable, skip, Subscription, throttleTime } from 'rxjs';
import { OfferForCompanyFormComponent } from '../offerForCompany-form/offerForCompany-form.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { ListViewService } from '../../../templates/listViewMenu/list-view.service';
import { KeyName } from '../../../templates/list-sorter/list-sorter.component';
import { getListSorterOptions } from '../../employee/emloyee-list/employee-list.component';
import { ListSorterService } from '../../../templates/list-sorter/list-sorter.service';

@Component({
    selector: 'randem-frames-offer-for-company-list',
    templateUrl: './offerForCompany-list.component.html',
    styleUrl: './offerForCompany-list.component.scss',
    providers: [DialogConfirmService, DialogFormService, ListSorterService],
})
export class OfferForCompanyListComponent implements OnInit, OnDestroy {
    constructor(
        private listOfferForCompanyGQL: ListOfferForCompanyGQL,
        private activatedRoute: ActivatedRoute,
        private dialogFormService: DialogFormService,
        private listViewService: ListViewService
    ) {}

    private list$!: Observable<ListOfferForCompanyQuery['listOffersForCompany']>;
    list_ = signal<ListOfferForCompanyQuery['listOffersForCompany']>([]);
    listFiltered_ = signal<ListOfferForCompanyQuery['listOffersForCompany']>([]);

    // listViewKey!: WritableSignal<StateValueTypes['LIST_VIEW_STATE']>;

    subscription = new Subscription();

    options: KeyName<ListOfferForCompanyQuery['listOffersForCompany'][number] & Record<string, unknown>>[] =
        getListSorterOptions(
            listSorter_optionsListOfferCompany as any,
            this.activatedRoute.snapshot.data['key']
        ) as any;

    listView$ = this.listViewService.viewType$;
    filterView$ = this.listViewService.filterSate$;

    ngOnInit() {
        this.list$ = this.listOfferForCompanyGQL
            .watch({}, { fetchPolicy: 'cache-and-network' }) //
            .valueChanges.pipe(
                map(res => res.data.listOffersForCompany),
                map(services => {
                    const companyId = this.activatedRoute.snapshot.paramMap.get('companyId');
                    if (companyId) {
                        return services.filter(service => service.company?.id === companyId);
                    }
                    return services;
                })
            );

        this.subscription.add(this.list$.subscribe(list => this.list_.set(list)));
        // this.subscription.add(this.listView$.subscribe(key => (this.listViewKey = signal(key))));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    openDialogCreate() {
        return this.dialogFormService.openFormDialog<OfferForCompanyFormComponent['dialogData']>(
            OfferForCompanyFormComponent
        );
    }
}

export const listSorter_optionsListOfferCompany: Record<
    string,
    KeyName<ListOfferForCompanyQuery['listOffersForCompany'][number] & Record<string, unknown>>[]
> = {
    offerCompany: [{ key: 'customName', name: 'nazwa usługi' }],
    default: [
        { key: 'customName', name: 'nazwa usługi' },
        { key: 'company.name', name: 'firma wykonująca' },
        { key: 'offer.name', name: 'oferta ogólna' },
        { key: 'offer.category.name', name: 'kategoria' },
        // { key: 'price', name: 'cena' },
    ],
};
