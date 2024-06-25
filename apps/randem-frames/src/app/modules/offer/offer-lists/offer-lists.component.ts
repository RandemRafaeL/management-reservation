import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabNavPanel } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../../state/user/_user.store';
import { map } from 'rxjs/operators';
import { UserRoleEnum } from '../../../../graphql/_generated/types';

interface Tab {
    label: string;
    link: string;
}
@Component({
    selector: 'randem-frames-offer-lists',
    templateUrl: './offer-lists.component.html',
    styleUrl: './offer-lists.component.scss',
})
export class OfferListsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatTabNavPanel) tabPanel!: MatTabNavPanel;
    @ViewChild('box') box!: ElementRef<HTMLDivElement>;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private store: Store
    ) {}

    userStateRole$ = this.store.select(selectUserData).pipe(map(user => user.role as UserRoleEnum));

    tabs: Tab[] = [
        {
            label: 'usługi pracowników',
            link: '/employee-services/list',
        },
        {
            label: 'usługi firmowe',
            link: '/company-services/list',
        },
        {
            label: 'usług ogólne',
            link: '/services/list',
        },
        {
            label: 'kategorie usług',
            link: '/category/list',
        },
    ];

    activeLink = '';
    width: number | undefined;

    subscription = new Subscription();

    ngOnInit() {
        this.subscription.add(
            this.activatedRoute.paramMap.subscribe(() => {
                const url = this.router.url;
                const matchingTab = this.tabs.find(tab => url.includes(tab.link));
                if (matchingTab) {
                    this.activeLink = matchingTab.link;
                } else {
                    console.warn('Nie znaleziono poprawnej ścieżki');
                }
            })
        );
    }

    ngAfterViewInit() {
        // fixed slider mat-tab-nav
        setTimeout(() => {
            this.width = this.box.nativeElement.clientWidth;
        }, 0);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    navigate(link: string) {
        this.router.navigate(['/dashboard/offer' + link]).then(() => {
            this.activeLink = link;
        });
    }
}
