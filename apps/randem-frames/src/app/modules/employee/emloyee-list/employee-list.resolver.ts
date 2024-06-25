import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EmployeeType } from '../../../../graphql/_generated/types';
import { ListEmployees_UserGQL } from '../../../../graphql/employee/query/listEmployee.query.generated';
import { map } from 'rxjs/operators';

export const employeeListResolver: ResolveFn<EmployeeType[]> = (
    route,
    state,
    listEmployee = inject(ListEmployees_UserGQL)
) => {
    const companyId = route.paramMap.get('companyId');
    console.log('[employeeListResolver] companyId', companyId);
    return listEmployee
        .watch()
        .valueChanges //
        .pipe(
            map(res => res.data.listEmployee_User as EmployeeType[]),
            map(employees => {
                if (companyId) {
                    return employees.filter(employee => employee.company?.id === companyId);
                }
                return employees;
            })
        );
};
