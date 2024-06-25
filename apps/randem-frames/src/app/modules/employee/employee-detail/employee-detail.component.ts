import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { EmployeeType } from '../../../../graphql/_generated/types';
import { EmployeeFormComponent } from '../employe-form/employee-form.component';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { RouteParamsService } from '../../../core/services/router/route-params.service';
import { GetEmployeeGQL, GetEmployeeQuery } from '../../../../graphql/employee/query/getEmployee.quey.generated';
import { Location } from '@angular/common';

@Component({
    selector: 'randem-frames-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrl: './employee-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private dialogFormService: DialogFormService,
        private routeParamsService: RouteParamsService,
        private getEmployeeGQL: GetEmployeeGQL,
        private location: Location
    ) {}

    startValue!: string;
    currentEmployee$!: Observable<GetEmployeeQuery['getEmployee']>;
    currentEmployee_ = signal<GetEmployeeQuery['getEmployee'] | undefined>(undefined);

    subscription = new Subscription();

    ngOnInit() {
        this.currentEmployee$ = this.activatedRoute.params.pipe(
            switchMap(param =>
                this.getEmployeeGQL
                    .watch({ employeeId: param['employeeId'] })
                    .valueChanges.pipe(map(res => res.data.getEmployee))
                    .pipe(
                        distinctUntilChanged(),
                        tap(employee => {
                            employee ? this.currentEmployee_.set(employee) : this.location.back();
                        })
                    )
            )
        );

        this.subscription.add(
            this.activatedRoute.data.subscribe(employee => {
                console.log('CurrentEmployeeList', employee);
            })
        );

        this.subscription.add(
            this.currentEmployee$.subscribe(employee => {
                console.log('CurrentEmployee', employee);
            })
        );
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    selectEmployee($event: unknown) {
        const companyId = $event as EmployeeType['id'];
        console.log(companyId);
        this.router.navigate(['/dashboard/employee/detail', companyId]).then();
    }

    updateItem() {
        const { employeeId } = this.routeParamsService.params;
        this.dialogFormService.openFormDialog(EmployeeFormComponent, { employeeId });
    }
}
