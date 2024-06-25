import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferForEmployeeComponent } from './offerForEmployee.component';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';
import { CardModule, ContainerModule, GridCardModule, ItemsModule, RlFormsModule } from '@randem-frames/ui-rl';
import { OfferForCompanyModule } from '../offer-for-company/offerForCompany.module';
import { ImagesModule } from '../images/images.module';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferForEmployeeListComponent } from './offerForEmployee-list/offerForEmployee-list.component';
import { OfferForEmployeeListHeaderComponent } from './offerForEmployee-list-header/offerForEmployee-list-header.component';
import { OfferForEmployeeFormComponent } from './offerForEmployee-form/offerForEmployee-form.component';
import { OfferForEmployeeListCardComponent } from './offerForEmployee-card/offerForEmployee-list-card.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ListViewMenuComponent } from '../../templates/listViewMenu/listViewMenu.component';
import { IsEmptyArrayPipe } from '../../Helpers/pipes/isEmptyArray.pipe';
import { ListViewFilterComponent } from '../../templates/listViewFilter/listViewFilter.component';
import { ListSorterComponent } from '../../templates/list-sorter/list-sorter.component';

@NgModule({
    declarations: [
        OfferForEmployeeComponent,
        OfferForEmployeeListComponent,
        OfferForEmployeeListHeaderComponent,
        OfferForEmployeeFormComponent,
        OfferForEmployeeListCardComponent,
    ],
    imports: [
        CommonModule,
        TitleTemplateModule,
        CardModule,
        GridCardModule,
        ItemsModule,
        OfferForCompanyModule,
        ImagesModule,
        MatIcon,
        MatIconButton,
        MatInput,
        MatFormField,
        ReactiveFormsModule,
        MatFabButton,
        MatMenu,
        MatMenuItem,
        MatTooltip,
        MatMenuTrigger,
        RlFormsModule,
        RouterLink,
        ListViewMenuComponent,
        IsEmptyArrayPipe,
        ListViewFilterComponent,
        ListSorterComponent,
        ContainerModule,
    ],
    exports: [OfferForEmployeeFormComponent],
})
export class OfferForEmployeeModule {}
