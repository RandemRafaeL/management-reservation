import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class DialogFormService {
    constructor(
        private dialog: Dialog,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        // in the future
        // this.deleteParam();
    }

    private queryParamsName = 'dialog';
    private queryParamsValue!: 'create' | 'update';

    openFormDialog<D = unknown>(component: ComponentType<unknown>, data?: D) {
        const ref = this.dialog.open(component, {
            backdropClass: 'backdrop',
            panelClass: 'dialog-form',
            hasBackdrop: true,
            disableClose: true,
            autoFocus: false,
            scrollStrategy: new NoopScrollStrategy(),
            // maxWidth: 1600,

            data: { ...data },
        });

        // in the future
        // this.addParam(data);

        // ref.closed.subscribe(() => this.deleteParam());

        return ref;
    }

    private addParam(data: unknown) {
        this.queryParamsValue = data ? 'update' : 'create';
        this.router
            .navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: { [this.queryParamsName]: this.queryParamsValue },
                queryParamsHandling: 'merge',
                preserveFragment: true,
            })
            .then();
    }

    private deleteParam() {
        const params = { ...this.activatedRoute.snapshot.queryParams };
        if (params?.[this.queryParamsName]) {
            delete params[this.queryParamsName];
        }

        this.router
            .navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: params,
                queryParamsHandling: '',
                preserveFragment: true,
                onSameUrlNavigation: 'reload',
            })
            .then();
    }
}
