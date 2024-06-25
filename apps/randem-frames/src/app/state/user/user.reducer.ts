import { createReducer, on } from '@ngrx/store';
import * as user from './index';

const action = user.userActions;
export const userReducer = createReducer(
    user.initialState,
    on(
        action.setUser, //
        (state, { user }) => ({ ...state, ...user })
    ),
    on(
        action.resetUser, //
        () => user.initialState
    ),
    on(action.loadingUserStart, state => ({ ...state, _isLoading: true })),
    on(action.loadingUserEnd, state => ({ ...state, _isLoading: false })),
    on(
        action.loadUserSuccess, //
        (state, { user }) => ({ ...state, ...user })
    ),
    on(
        action.loadUserFailure, //
        (state, { error }) => ({ ...state, _error: error as never })
    )
);
