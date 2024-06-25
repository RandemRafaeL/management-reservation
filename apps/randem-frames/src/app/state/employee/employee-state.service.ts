import { Injectable } from '@angular/core';
import {
    EntityActionFactory,
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
    EntityOp,
} from '@ngrx/data';
import { CreateEmployeeInput, EmployeeType, UpdateEmployeeInput } from '../../../graphql/_generated/types';
import { finalize, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
    CreateEmployeeGQL,
    CreateEmployeeMutation,
} from '../../../graphql/employee/mutate/createEmployee.mutate.generated';
import {
    DeleteEmployeeGQL,
    DeleteEmployeeMutation,
} from '../../../graphql/employee/mutate/removeEmployee.mutate.generated';
import {
    UpdateEmployeeGQL,
    UpdateEmployeeMutation,
} from '../../../graphql/employee/mutate/updateEmployee.mutate.generated';
import { Router } from '@angular/router';
import { ListEmployees_UserGQL } from '../../../graphql/employee/query/listEmployee.query.generated';

//  TODO deprecated

@Injectable({ providedIn: 'root' })
export class EmployeeStateService extends EntityCollectionServiceBase<EmployeeType> {
    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory,
        private entityActionFactory: EntityActionFactory,

        private listEmployeeGQL: ListEmployees_UserGQL,
        private createEmployeeGQL: CreateEmployeeGQL,
        private deleteEmployeeGQL: DeleteEmployeeGQL,
        private updateEmployeeGQL: UpdateEmployeeGQL,
        private router: Router
    ) {
        super('Employee', serviceElementsFactory);
    }

    override getAll() {
        this.setLoading(true);
        return this.listEmployeeGQL.fetch().pipe(
            map(res => {
                return res.data.listEmployee_User as EmployeeType[];
            }),
            tap(employees => {
                this.addAllToCache(employees); // Dodaj do cache i zarządzaj stanem
            }),
            catchError(error => {
                this.dispatch(this.entityActionFactory.create('Employee', EntityOp.QUERY_ALL_ERROR, error)); // Wysyłka akcji błędu
                this.setLoading(false);
                throw error; // Rzuć błąd dalej, jeśli chcesz, aby był obsłużony również poza serwisem
            }),
            finalize(() => {
                this.setLoading(false);
            }) // Zawsze zatrzymaj wskaźnik ładowania
        );
    }

    addOne(createEmployeeInput: CreateEmployeeInput) {
        return this.createEmployeeGQL
            .mutate({ createEmployeeInput }, { refetchQueries: [{ query: this.listEmployeeGQL.document }] })
            .pipe(
                map(result => {
                    return result.data?.createEmployee as CreateEmployeeMutation['createEmployee'];
                }),
                tap(employee => {
                    this.addOneToCache(<EmployeeType>(<unknown>employee));
                    this.refreshData();
                }),

                catchError(error => {
                    // Obsługa błędów
                    this.dispatch(this.entityActionFactory.create('Employee', EntityOp.SAVE_ADD_ONE_ERROR, error));
                    throw error;
                })
            );
    }

    deleteOne(deleteEmployeeId: string) {
        return this.deleteEmployeeGQL
            .mutate({ deleteEmployeeId }, { refetchQueries: [{ query: this.listEmployeeGQL.document }] })
            .pipe(
                map(result => {
                    return result.data?.deleteEmployee as DeleteEmployeeMutation['deleteEmployee'];
                }),
                tap(employee => {
                    !employee || this.removeOneFromCache(deleteEmployeeId);
                    this.refreshData();
                }),

                catchError(error => {
                    // Obsługa błędów
                    this.dispatch(this.entityActionFactory.create('Employee', EntityOp.SAVE_ADD_ONE_ERROR, error));
                    throw error;
                })
            );
    }

    updateOne(updateEmployeeId: string, updateEmployeeInput: UpdateEmployeeInput) {
        return this.updateEmployeeGQL
            .mutate(
                { updateEmployeeId, updateEmployeeInput },
                { refetchQueries: [{ query: this.listEmployeeGQL.document }] }
            )
            .pipe(
                map(result => {
                    return result.data?.updateEmployee as UpdateEmployeeMutation['updateEmployee'];
                }),
                tap(employee => {
                    console.log('UPDATE ONE employee', employee);
                    !employee || this.updateOneInCache(<EmployeeType>employee);
                    this.refreshData();
                }),

                catchError(error => {
                    // Obsługa błędów
                    this.dispatch(this.entityActionFactory.create('Employee', EntityOp.SAVE_ADD_ONE_ERROR, error));
                    throw error;
                })
            );
    }

    refreshData() {
        // Refresh data
        // const currentUrl = this.router.url;
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //     this.router.navigate([currentUrl]).then();
        // });
    }
}
