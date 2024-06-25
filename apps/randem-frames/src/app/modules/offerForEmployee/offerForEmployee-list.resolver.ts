import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import {
    ListOfferForEmployeesGQL,
    ListOfferForEmployeesQuery,
} from '../../../graphql/offerForEmployee/query/listOfferForEmployee.query.generated';
import { map } from 'rxjs/operators';

export const offerForEmployeeListResolver: ResolveFn<ListOfferForEmployeesQuery['listOfferForEmployees']> = (
    route,
    state,
    listOfferEmployee = inject(ListOfferForEmployeesGQL)
) => {
    console.log('RESOLVER');
    return listOfferEmployee
        .fetch({}, { fetchPolicy: 'network-only' }) // TODO sprawdzić niepotrzebne ssie
        .pipe(map(res => res.data.listOfferForEmployees));
};
