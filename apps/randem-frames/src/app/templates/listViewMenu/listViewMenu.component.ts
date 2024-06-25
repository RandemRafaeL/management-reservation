import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { StateValueTypes } from '../../core/services/server-state/server-state.types';
import { ListViewService } from './list-view.service';

@Component({
    selector: 'randem-frames-list-view-menu',
    standalone: true,
    imports: [CommonModule, MatIcon, MatMenu, MatMenuTrigger, MatIconButton, MatMenuItem],
    templateUrl: './listViewMenu.component.html',
    styleUrl: './listViewMenu.component.scss',
})
export class ListViewMenuComponent implements OnInit, OnDestroy {
    constructor(private listViewService: ListViewService) {}

    listView: StateValueTypes['LIST_VIEW'] = 'full';
    listViewMatIcon?: string = '';

    subscription = new Subscription();

    lisViewOptions: Array<{ key: StateValueTypes['LIST_VIEW']; matIcon: string; option: string }> = [
        { key: 'list', option: 'lista', matIcon: 'view_list' },
        { key: 'small', option: 'małe karty', matIcon: 'view_module' },
        { key: 'full', option: 'pełne karty', matIcon: 'grid_view' },
        // { key: 'custom', option: 'spersonalizowany', matIcon: 'tune' },
    ];

    ngOnInit() {
        this.subscription.add(
            this.listViewService.viewType$.subscribe({
                next: value => {
                    this.listView = value ? value : 'full';
                    this.listViewMatIcon = this.lisViewOptions.find(option => option.key === this.listView)?.matIcon;
                },
            })
        );
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    setState(value: StateValueTypes['LIST_VIEW']) {
        this.listViewService.setViewType(value);
    }
}
