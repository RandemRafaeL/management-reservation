import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingCardComponent } from './booking-card/booking-card.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingHeaderComponent } from './booking-header/booking-header.component';
import { BookingComponent } from './booking.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule, GridCardModule, ItemsModule, RlFormsModule } from '@randem-frames/ui-rl';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { BookingStatusPipe, BookingUserComponent } from './booking-user/booking-user.component';
import { canActiveBooking } from '../../core/services/router/can-active-booking-user.service';
import { ImagesModule } from '../images/images.module';
import { MatChip, MatChipAvatar } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatOption } from '@angular/material/core';
import { MatList, MatListItem, MatListOption, MatSelectionList } from '@angular/material/list';

const routes: Routes = [
    { path: 'list', component: BookingUserComponent },

    {
        path: 'admin',
        // canActivate: [canActiveBooking],
        children: [{ path: 'list', component: BookingComponent, data: { title: 'Lista Rezerwacji' } }],
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
    declarations: [
        BookingListComponent,
        BookingCardComponent,
        BookingFormComponent,
        BookingHeaderComponent,
        BookingComponent,
        BookingUserComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CardModule,
        TitleTemplateModule,
        MatTooltip,
        MatFabButton,
        MatMenuTrigger,
        MatIcon,
        MatMenu,
        MatIconButton,
        MatMenuItem,
        GridCardModule,
        ItemsModule,
        RlFormsModule,
        ImagesModule,
        BookingStatusPipe,
        MatChip,
        MatChipAvatar,
        MatDivider,
        MatOption,
        MatList,
        MatSelectionList,
        MatListOption,
        MatListItem,
    ],
})
export class BookingModule {}
