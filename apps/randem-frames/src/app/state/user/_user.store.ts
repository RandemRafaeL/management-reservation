import { Company } from '../../modules/company/company.models';
import { createActionGroup, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { GraphQLError } from 'graphql/error';
import { ApolloError } from 'apollo-server-express';

export const FEATURE_USER = 'rl-user';

export interface UserState {
    id: string | null;
    username: string;
    role: string;
    company?: Company[];
    _error?: GraphQLError | ApolloError;
    _isLoading: boolean;
}

export const initialState: UserState = {
    id: null,
    username: '',
    role: '',
    _error: undefined,
    _isLoading: false,
};

// Definiowanie akcji
export const userActions = createActionGroup({
    source: 'User',
    events: {
        'Set User': props<{ user: UserState }>(),
        'Reset User': props<never>,
        'Load Current User': props<never>,
        'Load User Success': props<{ user: Omit<UserState, '_error' | '_isLoading'> }>(),
        'Load User Failure': props<{ error: unknown }>(),
        'Loading User Start': props<{ isLoading: true }>(),
        'Loading User End': props<{ isLoading: false }>(),

        //
        'Update User Companies': props<{ companies: Company[] }>(),
        //
        'Create Company': props<{ company: Company }>(),
        'Create Company Success': props<{ company: Company }>(),
        'Create Company Failure': props<{ error: unknown }>(),
        //
        'Update Company': props<{ companyId: number; company: Company }>(),
        'Update Company Success': props<{ company: Company }>(),
        'Update Company Failure': props<{ error: Error }>(),
        //
        'Delete Company': props<{ companyId: string }>(),
        'Delete Company Success': props<{ companyId: string }>(),
        'Delete Company Failure': props<{ companyId: string; error: Error }>(),
    },
});

// Reduktor
export const userReducer = createReducer(
    initialState,
    on(
        userActions.setUser, //
        (state, { user }) => ({ ...state, ...user })
    ),
    on(
        userActions.resetUser, //
        () => initialState
    ),
    on(userActions.loadingUserStart, state => ({ ...state, _isLoading: true })),
    on(userActions.loadingUserEnd, state => ({ ...state, _isLoading: false })),
    on(
        userActions.loadUserSuccess, //
        (state, { user }) => ({ ...state, ...user })
    ),
    on(
        userActions.loadUserFailure, //
        (state, { error }) => ({ ...state, _error: error as never })
    ),
    on(
        userActions.updateUserCompanies, //
        (state, { companies }) => ({
            ...state,
            company: companies,
        })
    ),
    // on(
    //     userActions.createCompanySuccess, //
    //     (state, { company }) => ({
    //         ...state,
    //         company: [...state.company, company],
    //     })
    // ),
    on(
        userActions.createCompanyFailure, //
        (state, { error }) => ({
            ...state,
            error: error,
        })
    ),
    on(
        userActions.updateCompanyFailure, //
        (state, { error }) => ({
            ...state,
            error: error,
        })
    ),
    // on(
    //     userActions.updateCompanySuccess, //
    //     (state, { company: updatedCompany }) => ({
    //         ...state,
    //         company: state.company.map(existingCompany =>
    //             existingCompany.id === updatedCompany.id ? updatedCompany : existingCompany
    //         ),
    //     })
    // ),
    // on(
    //     userActions.deleteCompany, //
    //     (state, { companyId }) => ({
    //         ...state,
    //         company: state.company.filter(company => company.id !== companyId),
    //     })
    // ),
    // on(
    //     userActions.deleteCompanySuccess, //
    //     (state, { companyId }) => ({
    //         ...state,
    //         company: state.company.filter(company => company.id !== companyId),
    //     })
    // ),
    on(
        userActions.deleteCompanyFailure, //
        (state, { error }) => ({
            ...state,
            error: error,
        })
    )
);

// Selektory
const selectUserFeature = createFeatureSelector<UserState>(FEATURE_USER);
export const selectUserData = createSelector(selectUserFeature, (state: UserState) => state);
