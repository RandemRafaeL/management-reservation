import { Injectable } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, skip, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RouteParamsService {
    constructor(private router: Router) {}

    private _subscription = new Subscription();
    private _params: Record<string, string> = {};
    private _params$ = new BehaviorSubject<Record<string, string>>({});

    get param$() {
        return this._params$.asObservable();
    }

    get params() {
        return this._params$.value;
    }

    init() {
        this._subscription.add(
            this.router.events.pipe().subscribe((event: NavigationEnd | ActivationEnd | unknown) => {
                if (event instanceof ActivationEnd) {
                    const params = event.snapshot?.params;
                    if (params) {
                        this._params = { ...this._params, ...params };
                    }
                }

                if (event instanceof NavigationEnd) {
                    this._params$.next(this._params);
                }
            })
        );

        this._subscription.add(
            this._params$.pipe(skip(1)).subscribe(params => {
                this._params = {};
            })
        );
    }

    deactivate() {
        this._subscription.unsubscribe();
    }
}
