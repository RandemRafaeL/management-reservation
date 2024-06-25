import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroupFromGQL } from '../../Helpers/form-generator/form-generate';
import { CreateEmployeeGQL } from '../../../graphql/employee/mutate/createEmployee.mutate.generated';
import { EmployeeFormComponent } from './employe-form/employee-form.component';
import { EmployeeStateService } from '../../state/employee/employee-state.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { DialogFormService } from '../../templates/dialog-modal/dialog-form/dialog-form.service';

@Component({
    selector: 'randem-frames-employee',
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.scss',
    providers: [DialogFormService],
})
export class EmployeeComponent implements OnInit, OnDestroy {
    constructor(
        private createEmployeeGQL: CreateEmployeeGQL,
        private employeeStateService: EmployeeStateService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialogFormService: DialogFormService
    ) {}

    controls = new FormGroupFromGQL(this.createEmployeeGQL.document);
    currentRoute!: 'list' | 'detail';
    title!: Observable<string>;

    subscription = new Subscription();

    ngOnInit() {
        this.title = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            startWith(this.router),
            switchMap(() => {
                const firstChild = this.activatedRoute.firstChild;
                return firstChild ? firstChild.data : [];
            }),
            map(data => `${data['title']}`)
        );

        this.employeeStateService.getAll().subscribe(el => console.log('EMPLOYEE get all', el));

        this.router.events
            .pipe(
                filter(instance => instance instanceof NavigationEnd),
                startWith(this.router)
            )
            .subscribe(() => {
                this.currentRoute = this.router.url.includes('/dashboard/employee/list') ? 'list' : 'detail';
            });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    openDialogCreate(employeeId: string | null = null) {
        return this.dialogFormService.openFormDialog(EmployeeFormComponent, employeeId);
    }

    openDialogUpdate() {
        console.log('Current id', this.activatedRoute.snapshot);

        this.activatedRoute.firstChild?.params.subscribe(param => {
            this.openDialogCreate(param['id']);
            console.log('Current id', param, param['id']);
        });
    }
}
