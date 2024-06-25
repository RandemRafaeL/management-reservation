import { createActionGroup, props } from '@ngrx/store';
import * as user from './index';

export const userActions = createActionGroup({
    source: 'User',
    events: {
        'Set User': props<{ user: user.UserState }>(),
        'Reset User': props<never>,
        'Load Current User': props<never>,
        'Load User Success': props<{ user: Omit<user.UserState, '_error' | '_isLoading'> }>(),
        'Load User Failure': props<{ error: unknown }>(),
        'Loading User Start': props<{ isLoading: true }>(),
        'Loading User End': props<{ isLoading: false }>(),
    },
});
