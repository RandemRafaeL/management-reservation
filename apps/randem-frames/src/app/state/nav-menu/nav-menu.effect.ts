import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { BreakpointService, BreakPointsList } from '../../core/services/breakpoints/breakpoint.service';
import { breakpointActions } from './breakpoints.action';
import { filter, map } from 'rxjs';
import { setLabels } from '@randem-frames/ui-rl';

@Injectable()
export class NavMenuEffect {
    constructor(
        private actions$: Actions,
        private store: Store,
        private breakpointService: BreakpointService
    ) {}

    navMenuLabel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(breakpointActions.setBreakpoint),
            filter(
                ({ breakpointName }: { breakpointName: BreakPointsList }) =>
                    breakpointName === 'xs' ||
                    breakpointName === 'sm' ||
                    breakpointName === 'xl' ||
                    breakpointName === 'xxl'
            ), // Przepuszczenie tylko akcji, gdzie breakpointName === 'xs'
            map(({ breakpointName }) => {
                if (breakpointName === 'xs' || breakpointName === 'sm') {
                    return setLabels({ onlyIcons: true });
                }
                return setLabels({ onlyIcons: false });
            })
        )
    );
}
