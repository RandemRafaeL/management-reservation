import { Injectable, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, startWith, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BreakpointService implements OnDestroy {
    private readonly resizeSubscription = new Subscription();

    breakpoints: Breakpoints = {
        xs: { min: 0, max: 479 },
        sm: { min: 480, max: 639 },
        md: { min: 640, max: 959 },
        lg: { min: 960, max: 1259 },
        xl: { min: 1260, max: 1919 },
        xxl: { min: 1920, max: 8192 },
    };

    getWindowSize$(): Observable<WindowSize> {
        return fromEvent(window, 'resize').pipe(
            debounceTime(50),
            map(() => {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            }),
            startWith({
                // Inicjalizacja strumienia bieżącymi wymiarami okna
                width: window.innerWidth,
                height: window.innerHeight,
            }),
            distinctUntilChanged()
        );
    }

    getBreakpoint$(): Observable<BreakPointsList> {
        return this.getWindowSize$().pipe(
            map(size => {
                return Object.entries(this.breakpoints)
                    .filter(([, value]) => value.max > size.width && value.min < size.width)
                    .map(([key]) => key)[0] as BreakPointsList;
            }),
            distinctUntilChanged()
        );
    }

    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
    }
}

export interface WindowSize {
    width: number;
    height: number;
}

interface Breakpoint {
    min: number;
    max: number;
}

export type BreakPointsList = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type Breakpoints = {
    [key in BreakPointsList]: Breakpoint;
};
