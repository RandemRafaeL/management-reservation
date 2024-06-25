import { ResolveFn } from '@angular/router';
import { ListCompanyGQL, ListCompanyQuery } from '../../../../graphql/company/listCompany.query.generated';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { companyActions } from '../../../state/company/company.store';

export const companyListResolver: ResolveFn<ListCompanyQuery['listCompany']> = (
    route,
    state,
    listCompany: ListCompanyGQL = inject(ListCompanyGQL),
    store = inject(Store)
) => {
    store.dispatch(companyActions.load());

    return listCompany //
        .fetch()
        .pipe(map(res => res.data?.listCompany || []));
};
