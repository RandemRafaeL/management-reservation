import { Component, OnInit } from '@angular/core';
import { ListBookingQuery } from '../../../graphql/booking/query/listBooking.query.generated';
import { DeleteBookingGQL } from '../../../graphql/booking/mutate/deleteBooking.mutate.generated';
import { DialogFormService } from '../../templates/dialog-modal/dialog-form/dialog-form.service';
import { DialogConfirmService } from '../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { filter, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ListBooking_UserGQL } from '../../../graphql/booking/query/listBooking_user.query.generated';

@Component({
    selector: 'randem-frames-booking',
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss',
    providers: [DialogFormService, DialogConfirmService],
})
export class BookingComponent implements OnInit {
    constructor(
        private listBookingGQL: ListBooking_UserGQL,
        private deleteBookingGQL: DeleteBookingGQL,
        private dialogFormService: DialogFormService,
        private dialogConfirmService: DialogConfirmService
    ) {}

    listBooking$!: Observable<ListBookingQuery['listBookings']>;

    ngOnInit() {
        this.listBooking$ = this.listBookingGQL //
            .watch({}, {})
            .valueChanges.pipe(map(res => res.data.listBooking_User));
    }

    openDialogCreate() {
        this.dialogFormService.openFormDialog(BookingFormComponent);
    }

    updateCustomer(bookingId: string) {
        this.dialogFormService.openFormDialog<BookingFormComponent['dialogData']>(BookingFormComponent, { bookingId });
    }

    deleteCustomer(bookingId: string) {
        this.dialogConfirmService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                switchMap(() =>
                    this.deleteBookingGQL //
                        .mutate(
                            { deleteBookingId: bookingId },
                            {
                                refetchQueries: [
                                    {
                                        query: this.listBookingGQL.document,
                                    },
                                ],
                            }
                        )
                        .pipe(map(res => res.data?.deleteBooking))
                )
            )
            .subscribe();
    }
}
