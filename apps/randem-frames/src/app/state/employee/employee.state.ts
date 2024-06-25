import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EmployeeType } from '../../../graphql/_generated/types';

export interface EmployeeState extends EntityState<EmployeeType> {
    loading: boolean;
    error: string | null;
}

export const employeeAdapter: EntityAdapter<EmployeeType> = createEntityAdapter<EmployeeType>({
    sortComparer: (a, b) => a.lastName.localeCompare(b.lastName), // Sortowanie po nazwisku
});

// Eksportowanie selektorów (opcjonalne, ale zalecane)
export const { selectIds, selectEntities, selectAll, selectTotal } = employeeAdapter.getSelectors();
