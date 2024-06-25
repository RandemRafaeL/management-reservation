import { ResolveFn } from '@angular/router';
import { ListOfferForCompanyGQL } from '../../../../graphql/offerForCompany/query/listOfferForCompany.query.generated';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { OfferForCompanyType } from '../../../../graphql/_generated/types';

export const offerForCompanyListResolver: ResolveFn<OfferForCompanyType[]> = (
    //
    route,
    state,
    list = inject(ListOfferForCompanyGQL)
) => {
    const companyId = route.paramMap.get('companyId');
    console.log('offer for company list resolver', companyId);
    return list.fetch().pipe(
        map(res => res.data.listOffersForCompany as OfferForCompanyType[]),
        map(services => {
            if (companyId) {
                return services.filter(employee => employee.company?.id === companyId);
            }
            return services;
        })
    );
};
