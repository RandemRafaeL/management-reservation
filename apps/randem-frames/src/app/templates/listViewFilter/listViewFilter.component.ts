import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ListViewService } from '../listViewMenu/list-view.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'randem-frames-list-view-filter',
    standalone: true,
    imports: [CommonModule, MatIconButton, MatIcon],
    templateUrl: './listViewFilter.component.html',
    styleUrl: './listViewFilter.component.scss',
})
export class ListViewFilterComponent implements OnInit, OnDestroy {
    constructor(private listViewService: ListViewService) {}

    subscription = new Subscription();

    filterState_ = signal<boolean>(false);

    toggleFilterState() {
        this.listViewService.setFilterSate(!this.listViewService.filterSate);
    }

    setFilterState(value: boolean) {
        this.listViewService.setFilterSate(value);
    }

    ngOnInit() {
        this.subscription.add(
            this.listViewService.filterSate$.subscribe(state => {
                state === null || this.filterState_.set(state);
            })
        );
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
