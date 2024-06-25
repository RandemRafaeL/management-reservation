import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetEmployeeGQL, GetEmployeeQuery } from '../../../../graphql/employee/query/getEmployee.quey.generated';
import { Location } from '@angular/common';

export const employeeResolver: ResolveFn<GetEmployeeQuery['getEmployee']> = (
    route,
    state,
    getEmployeeGQL = inject(GetEmployeeGQL)
) => {
    const companyId = route.paramMap.get('companyId');
    console.log('[employeeListResolver] companyId', companyId);
    return getEmployeeGQL.fetch().pipe(map(res => res.data?.getEmployee));
};
