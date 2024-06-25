import { createActionGroup, props } from '@ngrx/store';
import { BreakPointsList } from '../../core/services/breakpoints/breakpoint.service';

export const breakpointActions = createActionGroup({
    source: 'Breakpoint',
    events: {
        'Set Breakpoint': props<{ breakpointName: BreakPointsList }>(),
    },
});
