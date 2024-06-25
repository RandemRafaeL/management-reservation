import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RlFormModule } from '../../Helpers/rl-form/rl-form.module';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeListComponent } from './emloyee-list/employee-list.component';
import { MatListModule } from '@angular/material/list';
import { EmployeeFormComponent } from './employe-form/employee-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { LetDirective } from '@ngrx/component';
import {
    CardModule,
    ContainerModule,
    GridCardModule,
    ItemsModule,
    ResponsiveClassDirective,
    RlFormsModule,
} from '@randem-frames/ui-rl';
import { ImagesModule } from '../images/images.module';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';
import { FormCompleteComponent } from '../../templates/forms-auto-select/form-complete/form-complete.component';
import { ListSorterComponent } from '../../templates/list-sorter/list-sorter.component';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DetailTemplateOutletsComponent } from '../../templates/outlets/detail-template-outlets/detail-template-outlets.component';
import { EmployeeListHeaderComponent } from './employee-list-header/employee-list-header.component';
import { EmployeeDetailControlComponent } from './employee-detail-control/employee-detail-control.component';
import { OfferForEmployeeListComponent } from '../offerForEmployee/offerForEmployee-list/offerForEmployee-list.component';
import { IsEmptyArrayPipe, IsNotEmptyArrayPipe } from '../../Helpers/pipes/isEmptyArray.pipe';
import { OfferForEmployeeListHeaderComponent } from '../offerForEmployee/offerForEmployee-list-header/offerForEmployee-list-header.component';
import { ListViewMenuComponent } from '../../templates/listViewMenu/listViewMenu.component';
import { EmployeeDetailHeaderComponent } from './employee-detail-header/employee-detail-header.component';
import { employeeListResolver } from './emloyee-list/employee-list.resolver';
import { employeeResolver } from './employee-detail/employee-detail.resolver';
import { ListViewFilterComponent } from '../../templates/listViewFilter/listViewFilter.component';

const route: Routes = [
    {
        path: 'list',
        component: EmployeeComponent,
        children: [
            {
                path: '',
                outlet: 'header',
                data: { title: 'List Pracowników' },
                component: EmployeeListHeaderComponent,
            },

            {
                path: '',
                component: EmployeeListComponent,
            },
        ],
    },
    {
        path: ':employeeId/detail',
        component: EmployeeComponent,
        children: [
            {
                path: '',
                outlet: 'header',
                component: EmployeeDetailHeaderComponent,
                data: { title: 'Pracownik Szczegóły' },
            },
            {
                path: '',
                component: DetailTemplateOutletsComponent,
                children: [
                    {
                        path: '',
                        component: EmployeeDetailControlComponent,
                    },
                    {
                        path: '',
                        outlet: 'secondary',
                        component: EmployeeDetailComponent,
                    },
                ],
            },
        ],
    },

    {
        path: ':employeeId/offer',
        component: EmployeeComponent,
        children: [
            {
                path: '',
                outlet: 'header',
                component: OfferForEmployeeListHeaderComponent,
                data: { title: 'Pracownik - usługi' },
            },
            {
                path: '',
                component: DetailTemplateOutletsComponent,
                children: [
                    {
                        path: '',
                        component: EmployeeDetailControlComponent,
                    },
                    {
                        path: '',
                        outlet: 'secondary',
                        component: OfferForEmployeeListComponent,
                    },
                ],
            },
        ],
    },

    { path: '', redirectTo: 'list', pathMatch: 'full' },
];
@NgModule({
    declarations: [
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeFormComponent,
        EmployeeDetailComponent,
        EmployeeDetailHeaderComponent,
        EmployeeCardComponent,
        EmployeeListHeaderComponent,
        EmployeeDetailControlComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        RlFormModule,
        MatDividerModule,
        MatListModule,
        MatMenuModule,
        MatTooltipModule,
        CdkDrag,
        CdkDragHandle,
        NgOptimizedImage,
        LetDirective,
        CardModule,
        ImagesModule,
        TitleTemplateModule,
        ItemsModule,
        ResponsiveClassDirective,
        FormCompleteComponent,
        GridCardModule,
        RlFormsModule,
        ListSorterComponent,
        MatPrefix,
        MatFormField,
        MatInput,
        RlFormsModule,
        DetailTemplateOutletsComponent,
        IsEmptyArrayPipe,
        IsNotEmptyArrayPipe,
        ListViewMenuComponent,
        ListViewFilterComponent,
        ContainerModule,
    ],
    exports: [EmployeeListComponent, EmployeeDetailComponent],
})
export class EmployeeModule {}
