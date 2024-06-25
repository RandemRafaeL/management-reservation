/* eslint-disable */
import { CompanyType, CreateCompanyInput, UpdateCompanyInput } from '../../../graphql/_generated/types';
import { createActionGroup, createReducer, createSelector, on, props } from '@ngrx/store';
import { UpdateCompanyMutation } from '../../../graphql/company/updateCompany.mutate.generated';
import { error } from 'ng-packagr/lib/utils/log';

export const FEATURE_COMPANY = 'company';

export type CompanyItemState = CompanyType & { userId?: string };
export type CompanyCollectionState = CompanyItemState[];
export interface CompanyState {
    collection: CompanyCollectionState;
    isLoading: boolean;
    error: any;
}

export const initialOneState: CompanyItemState = {
    id: '',
    name: '',
    email: '',
    address: '',
    imageUrl: '',
    imageId: '',
    description: '',
    phoneNumber: '',
    userId: '',
};

export const initialState: CompanyState = {
    collection: [],
    isLoading: false,
    error: {},
};

export const companyActions = createActionGroup({
    source: 'Company',
    events: {
        'Set All': props<{ companies: CompanyCollectionState }>(),
        'Add One': props<{ company: CompanyItemState }>(),

        'Load ': props<never>,
        'Load Success': props<{ companies: CompanyCollectionState }>(),
        'Load Failure': props<{ error: unknown }>(),

        'Loading Start': props<{ isLoading: true }>(),
        'Loading End': props<{ isLoading: false }>(),

        'Create One': props<{ company: CreateCompanyInput }>(),
        'Create One Success': props<{ company: CompanyItemState }>(),
        'Create One Failure': props<{ error: unknown }>(),
        //
        'Update One': props<{ companyId: string; company: UpdateCompanyInput }>(),
        'Update One Success': props<{ company: CompanyItemState }>(),
        'Update One Failure': props<{ error: Error }>(),
        //
        'Delete One': props<{ companyId: string }>(),
        'Delete One Success': props<{ companyId: string }>(),
        'Delete One Failure': props<{ companyId: string; error: Error }>(),

        'Reset Error': props<{ error: undefined }>(),
    },
});

export const companyReducer = createReducer(
    initialState,
    on(companyActions.setAll, (state, { companies }) => ({
        ...state,
        collection: companies,
    })),
    on(companyActions.addOne, (state, { company }) => ({
        ...state,
        collection: [...state.collection, company],
    })),
    on(companyActions.loadSuccess, (state, { companies }) => ({
        ...state,
        collection: companies,
    })),
    on(companyActions.loadFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
    on(companyActions.loadingStart, state => ({
        ...state,
        isLoading: true,
    })),
    on(companyActions.loadingEnd, state => ({
        ...state,
        isLoading: false,
    })),
    // Nie zmieniaj stanu przy wywołaniu akcji createOne
    on(companyActions.createOneSuccess, (state, { company }) => ({
        ...state,
        collection: [...state.collection, company],
    })),
    on(companyActions.createOneFailure, (state, error) => ({
        ...state,
        error: error,
    })),
    on(companyActions.updateOne, state => ({
        ...state,
        // Możesz dodać logikę oczekiwania na aktualizację, jeśli jest potrzebna
    })),
    on(companyActions.updateOneSuccess, (state, { company }) => ({
        ...state,
        collection: state.collection.map(c => (c.id === company.id ? company : c)),
    })),
    on(companyActions.updateOneFailure, (state, error) => ({
        ...state,
        error: error,
    })),
    on(companyActions.deleteOneSuccess, (state, { companyId }) => ({
        ...state,
        collection: state.collection.filter(c => c.id !== companyId),
    })),
    on(companyActions.deleteOneFailure, (state, error) => ({
        ...state,
        error: error,
    })),
    on(companyActions.resetError, state => ({
        ...state,
        error: undefined,
    }))
);

// Selektor dla całego stanu 'company'
export const selectCompanyFeature = (state: any) => state[FEATURE_COMPANY];

// Selektor dla listy wszystkich firm
export const selectAllCompanies = createSelector(selectCompanyFeature, (state: CompanyState) => state.collection);

export const selectCompanyError = createSelector(selectCompanyFeature, (state: CompanyState) => state.error);

// Selektor dla pojedynczej firmy na podstawie ID
export const selectCompanyById = (companyId: string) =>
    createSelector(selectAllCompanies, (collection: CompanyCollectionState) =>
        collection.find(company => company.id === companyId)
    );

// Selektor sprawdzający, czy firma o danym ID istnieje
export const isCompanyExist = (companyId: string) =>
    createSelector(selectAllCompanies, (collection: CompanyCollectionState) =>
        collection.some(company => company.id === companyId)
    );
