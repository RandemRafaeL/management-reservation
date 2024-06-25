import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferForCompanyComponent } from './offerForCompany.component';
import { OfferForCompanyFormComponent } from './offerForCompany-form/offerForCompany-form.component';
import { OfferForCompanyCardComponent } from './offerForCompany-card/offerForCompany-card.component';
import { CardModule, ContainerModule, GridCardModule, ItemsModule } from '@randem-frames/ui-rl';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesModule } from '../images/images.module';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { OfferForCompanyListComponent } from './offerForCompany-list/offerForCompany-list.component';
import { OfferForCompanyListHeaderComponent } from './offerForCompany-list-header/offerForCompany-list-header.component';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatMenuItem, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RlFormsModule } from '@randem-frames/ui-rl';
import { ListViewMenuComponent } from '../../templates/listViewMenu/listViewMenu.component';
import { OfferForCompanyDetailComponent } from './offerForCompany-detail/offerForCompany-detail.component';
import { OfferForEmployeeDetailHeaderComponent } from '../offerForEmployee/offerForEmployee-detail-header/offerForEmployee-detail-header.component';
import { OfferForCompanyDetailHeaderComponent } from './offerForCompany-detail-header/offerForCompany-detail-header.component';
import { OfferForCompanyDetailControlComponent } from './offerForCompany-detail-control/offerForCompany-detail-control.component';
import { FormCompleteComponent } from '../../templates/forms-auto-select/form-complete/form-complete.component';
import { MatListItem, MatSelectionList } from '@angular/material/list';
import { IsEmptyArrayPipe } from '../../Helpers/pipes/isEmptyArray.pipe';
import { ListSorterComponent } from '../../templates/list-sorter/list-sorter.component';
import { ListViewFilterComponent } from '../../templates/listViewFilter/listViewFilter.component';

@NgModule({
    declarations: [
        OfferForCompanyComponent,
        OfferForCompanyFormComponent,
        OfferForCompanyCardComponent,
        OfferForCompanyListComponent,
        OfferForCompanyListHeaderComponent,
        OfferForCompanyDetailComponent,
        OfferForEmployeeDetailHeaderComponent,
        OfferForCompanyDetailHeaderComponent,
        OfferForCompanyDetailControlComponent,
    ],
    imports: [
        CommonModule,
        CardModule,
        ReactiveFormsModule,
        ImagesModule,
        MatFormFieldModule,
        MatHint,
        MatSelectModule,
        MatOption,
        MatInput,
        CdkTextareaAutosize,
        ItemsModule,
        TitleTemplateModule,
        MatTooltipModule,
        MatFabButton,
        MatMenuTrigger,
        MatIcon,
        MatMenuModule,
        MatMenuItem,
        MatIconButton,
        MatButton,
        RouterLink,
        GridCardModule,
        RlFormsModule,
        ListViewMenuComponent,
        RouterOutlet,
        FormCompleteComponent,
        MatListItem,
        MatSelectionList,
        IsEmptyArrayPipe,
        ListSorterComponent,
        ListViewFilterComponent,
        ContainerModule,
    ],
    exports: [
        OfferForCompanyComponent,
        OfferForCompanyFormComponent,
        OfferForCompanyListComponent,
        OfferForCompanyCardComponent,
    ],
})
export class OfferForCompanyModule {}
