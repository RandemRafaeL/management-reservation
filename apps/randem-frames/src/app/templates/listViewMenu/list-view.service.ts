import { Injectable } from '@angular/core';
import {
    STATE_FILTER_VIEW_KEY,
    STATE_LIST_VIEW_KEY,
    StateValueTypes,
} from '../../core/services/server-state/server-state.types';
import { ServerStateService } from '../../core/services/server-state/server-state.service';
import { BehaviorSubject, Subscription, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ListViewService {
    constructor(private serverStateService: ServerStateService) {
        this.serverStateService.getState(STATE_LIST_VIEW_KEY).subscribe({
            next: data => {
                this._viewType.next(data?.value ? data?.value : 'full');
            },
        });
        this.serverStateService.getState(STATE_FILTER_VIEW_KEY).subscribe({
            next: data => {
                this._filterSate.next(!!data?.value);
            },
        });
    }
    private subscription = new Subscription();

    private _viewType = new BehaviorSubject<StateValueTypes['LIST_VIEW'] | null>(null);

    get viewType() {
        return this._viewType.value;
    }

    get viewType$() {
        return this._viewType.asObservable();
    }

    setViewType(value: StateValueTypes['LIST_VIEW']) {
        this._viewType.next(value);
        this.serverStateService.setState({ key: STATE_LIST_VIEW_KEY, value }).pipe(take(1)).subscribe();
    }

    private _filterSate = new BehaviorSubject<StateValueTypes['FILTER_VIEW'] | null>(null);

    get filterSate() {
        return this._filterSate.value;
    }

    get filterSate$() {
        return this._filterSate.asObservable();
    }

    setFilterSate(value: StateValueTypes['FILTER_VIEW']) {
        this._filterSate.next(value);
        this.serverStateService.setState({ key: STATE_FILTER_VIEW_KEY, value }).subscribe();
    }
}
