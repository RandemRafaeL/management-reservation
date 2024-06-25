import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable, of, startWith, switchMap, take, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreakpointService } from '../../../core/services/breakpoints/breakpoint.service';
import { Location } from '@angular/common';

@Component({
    selector: 'randem-frames-title-template-header',
    templateUrl: './title-template-header.component.html',
    styleUrl: './title-template-header.component.scss',
})
export class TitleTemplateHeaderComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breakpointService: BreakpointService,
        private location: Location
    ) {}

    @Input() set title(val: string | Observable<string>) {
        console.log('title', val);

        if (typeof val === 'string') {
            this._title = of(val);
        } else {
            this._title = val;
        }
    }

    get title(): Observable<string> {
        return this._title as Observable<string>;
    }

    key = '';

    breakpoint$ = this.breakpointService.getBreakpoint$();

    _title!: Observable<string>;

    ngOnInit() {
        if (!this._title) {
            this._title = this.router.events.pipe(
                filter(event => event instanceof NavigationEnd),
                take(1),
                startWith(undefined),
                switchMap(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route.data;
                }),
                tap(({ key }) => (this.key = key)),
                map(data => `${data['title']}`)
            );
        }
    }

    back() {
        this.location.back();
    }
}
