import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AppState, setTheme } from '../../state/randem-frame.store';
import { Store } from '@ngrx/store';
import { filter, first, Observable, pipe, tap } from 'rxjs';
import { RlNavMenuItem, selectOnlyIcons } from '@randem-frames/ui-rl';
import { AuthApiService } from '../../core/auth/auth-api.service';
import * as user from '../../state/user';
import { map } from 'rxjs/operators';
import { companyActions } from '../../state/company/company.store';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BreakpointService } from '../../core/services/breakpoints/breakpoint.service';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { UserState } from '../../state/user';
import { ListViewService } from '../listViewMenu/list-view.service';
import { RouteParamsService } from '../../core/services/router/route-params.service';

type CurrentUser = Pick<user.UserState, 'username' | 'role'>;
@Component({
    selector: 'randem-frames-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

    @ViewChild('toolbar', { static: false }) toolbar!: ElementRef;
    @ViewChild('sidenavContainer', { static: false }) sidenavContainer!: ElementRef;

    constructor(
        private store: Store<AppState>,
        private auth: AuthApiService,
        private router: Router,
        private breakpointService: BreakpointService,
        private listViewService: ListViewService,
        private routeParamsService: RouteParamsService,
        private renderer: Renderer2
    ) {
        this.routeParamsService.init();
    }

    currentTheme$ = this.store.select(state => state.template.theme);
    navMenuItems!: RlNavMenuItem[];
    currentUser$!: Observable<CurrentUser>;
    sidenavMode: MatDrawerMode = 'side';

    onlyIcon$ = this.store.select(selectOnlyIcons);

    ngOnInit() {
        this.loadCurrentUser();
        this.loadAllCompanies();

        this.store
            .select(user.userSelectState)
            .pipe(filter(({ role }) => !!role))
            .subscribe(({ role }) => {
                console.log('role', role);
                const _role = role as unknown as UserState['role'];
                switch (_role) {
                    case 'ADMIN': {
                        this.navMenuItems = navMenuItemsADMIN;
                        break;
                    }
                    case 'OWNER': {
                        this.navMenuItems = navMenuItemsOWNER;
                        break;
                    }
                }
            });

        this.currentUser$ = this.store
            .select(user.userSelectState)
            .pipe(map(({ username, role }) => ({ username, role })));

        this.breakpointService.getBreakpoint$().subscribe(breakpointName => {
            // this.store.dispatch(breakpointActions.setBreakpoint({ breakpointName }));
            if (breakpointName === 'xs' || breakpointName === 'sm') {
                this.sidenavMode = 'over';
                this.sidenav.opened = false;
            } else {
                this.sidenavMode = 'side';
                this.sidenav.opened = true;
            }
        });
    }

    ngAfterViewInit() {
        this.adjustSidenavMargin();
        window.addEventListener('resize', () => this.adjustSidenavMargin());
    }

    adjustSidenavMargin() {
        const toolbarHeight = this.toolbar.nativeElement.offsetHeight;
        this.renderer.setStyle(this.sidenavContainer.nativeElement, 'marginTop', `${toolbarHeight}px`);
    }

    loadCurrentUser() {
        this.store.dispatch(user.userActions.loadCurrentUser());
    }

    loadAllCompanies() {
        this.store.dispatch(companyActions.load());
    }

    changeTheme() {
        this.store
            .select(state => state.template.theme)
            .pipe(first())
            .subscribe(currentTheme => {
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.store.dispatch(setTheme({ theme: newTheme }));
            });
    }

    changeLang(lang: 'en' | 'pl') {
        const url = this.router.url;

        if (environment.useLanguagePrefix) {
            console.log(`${environment.apiUrl}/${lang}/#${url}`);
            window.location.href = `${environment.apiUrl}/${lang}/#${url}`;
        } else {
            const address = environment.languages[lang];
            console.log(`${address}/#${url}`);
            window.location.href = `${address}/#${url}`;
        }
    }

    logOut() {
        this.auth.logout();
    }

    protected readonly window = window;
}

export const navMenuItemsADMIN: RlNavMenuItem[] = [
    { matIcon: 'person', title: $localize`:@@company_user:Użytkownicy`, subTitle: '', route: '/dashboard/user' },
    { matIcon: 'business', title: $localize`:@@company_menu:Podmiot`, subTitle: '', route: '/dashboard/company' },
    {
        matIcon: 'groups',
        title: $localize`:@@employees_manu:Pracownicy`,
        subTitle: '',
        route: '/dashboard/employee/list',
    },
    { matIcon: 'content_cut', title: $localize`:@@services_menu:Usługi`, subTitle: '', route: '/dashboard/offer' },
    { matIcon: 'analytics', title: $localize`:@@analytic_menu:Analityka`, subTitle: '', route: '/dashboard/analytic' },
    { matIcon: 'book_online', title: $localize`:@@reservation:Rezerwacje`, route: '/dashboard/booking/admin/list' },
    { matIcon: 'diversity_3', title: $localize`:@@customers:Klienci`, route: '/dashboard/customer' },
    { matIcon: 'space' },
    { matIcon: 'developer_mode', title: 'Sandbox', subTitle: '', route: '/dashboard/sandbox' },
    { matIcon: 'space' },
    { matIcon: 'chat', title: $localize`:@@chat_menu:Komunikator`, subTitle: '' },
    { matIcon: 'email', title: $localize`:@@email_menu:E-mail`, subTitle: '' },
    { matIcon: 'dashboard', title: $localize`:@@table_menu:Tablica`, subTitle: '' },
    { matIcon: 'task', title: $localize`:@@tasks_menu:Zadania`, subTitle: '' },
    { matIcon: 'space-grow' },
    { matIcon: 'attach_money', title: $localize`:@@priceList_menu:Cennik`, subTitle: '' },
    { matIcon: 'manage_accounts', title: $localize`:@@profile:Profil`, subTitle: '' },
    { matIcon: 'space-sm' },
];

export const navMenuItemsOWNER: RlNavMenuItem[] = [
    { matIcon: 'business', title: $localize`:@@company_menu:Podmiot`, subTitle: '', route: '/dashboard/company' },
    {
        matIcon: 'groups',
        title: $localize`:@@employees_manu:Pracownicy`,
        subTitle: '',
        route: '/dashboard/employee/list',
    },
    { matIcon: 'content_cut', title: $localize`:@@services_menu:Usługi`, subTitle: '', route: '/dashboard/offer' },
    { matIcon: 'analytics', title: $localize`:@@analytic_menu:Analityka`, subTitle: '', route: '/dashboard/analytic' },
    {
        matIcon: 'book_online',
        title: $localize`:@@reservation:Rezerwacje`,
        subTitle: '',
        route: '/dashboard/booking/list',
    },
    { matIcon: 'space-lg' },
    { matIcon: 'chat', title: $localize`:@@chat_menu:Komunikator`, subTitle: '' },
    { matIcon: 'email', title: $localize`:@@email_menu:E-mail`, subTitle: '' },
    { matIcon: 'dashboard', title: $localize`:@@table_menu:Tablica`, subTitle: '' },
    { matIcon: 'task', title: $localize`:@@tasks_menu:Zadania`, subTitle: '' },
    { matIcon: 'space-grow' },
    { matIcon: 'attach_money', title: $localize`:@@priceList_menu:Cennik`, subTitle: '' },
    { matIcon: 'manage_accounts', title: $localize`:@@profile:Profil`, subTitle: '' },
    { matIcon: 'space-sm' },
];
