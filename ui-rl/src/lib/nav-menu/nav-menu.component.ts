import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    appearanceNavMenu_initial,
    RlAppearanceNavMenu,
    RlNavMenuItem,
    RlNavMenuItems,
    RlNavMenuState,
    selectNavMenuItems,
    selectOnlyIcons,
    selectSelectedItem,
    setNavItem,
    setNavMenuItems,
    toggleLabels,
} from './nav-menu.state';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
    selector: 'rl-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent implements OnInit {
    @Input() set navMenuItems(value: RlNavMenuItems) {
        this.store.dispatch(setNavMenuItems({ items: value }));
    }

    @Input() appearance: RlAppearanceNavMenu = appearanceNavMenu_initial;

    @Output() selectItem: EventEmitter<RlNavMenuItem> = new EventEmitter();

    menuItems$!: Observable<RlNavMenuItem[]>;
    selectedItem$!: Observable<RlNavMenuItem | undefined>;
    onlyIcon$!: Observable<boolean>;

    currentIndex = -1;
    activeLink: string = this.router.url;

    constructor(
        private store: Store<RlNavMenuState>,
        private router: Router
    ) {}
    ngOnInit() {
        this.menuItems$ = this.store.select(selectNavMenuItems);
        this.selectedItem$ = this.store.select(selectSelectedItem);
        this.onlyIcon$ = this.store.select(selectOnlyIcons);

        this.router.events //
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                this.activeLink = (event as NavigationEnd).urlAfterRedirects;
            });

        this.onlyIcon$.subscribe(() => {
            window.dispatchEvent(new Event('resize'));
        });
    }
    selectNavItemAndNavigate(item: RlNavMenuItem, index: number) {
        this.store.dispatch(setNavItem({ selectedItem: item }));
        this.currentIndex = index;
        this.selectedItem$
            .pipe(
                filter(item => !!item?.route),
                map(item => item?.route as string)
            )
            .subscribe(route => {
                this.router.navigate([route]).then();
            });
    }

    toggleHideLabels() {
        this.store.dispatch(toggleLabels());
    }

    activeRoute(activeLink: string, route?: string) {
        if (!route) return;
        return this.activeLink.includes(route);
    }
}

@Pipe({
    name: 'activeRoute',
})
export class ActiveRoutePipe implements PipeTransform {
    transform(activeLink: string, route?: string): boolean {
        return !!route && activeLink.includes(route);
    }
}
