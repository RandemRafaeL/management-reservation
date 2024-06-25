import { AfterViewInit, Component, OnDestroy, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import {
    ListBooking_UserGQL,
    ListBooking_UserQuery,
} from '../../../../graphql/booking/query/listBooking_user.query.generated';
import { BehaviorSubject, combineLatest, filter, Observable, of, startWith, Subscription, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import * as Types from '../../../../graphql/_generated/types';
import { BookingStatus } from '../../../../graphql/_generated/types';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import {
    DialogConfirmContent,
    DialogConfirmType,
} from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.component';
import { UpdateBookingGQL } from '../../../../graphql/booking/mutate/updateBooking.mutate.generated';
import { MatSelectionList } from '@angular/material/list';

const statusToIcon: { [key in BookingStatus]: string } = {
    SCHEDULED: 'schedule',
    CONFIRMED: 'circle',
    COMPLETED: 'check_circle',
    CANCELED: 'check_indeterminate_small',
};

@Component({
    selector: 'randem-frames-booking-user',
    templateUrl: './booking-user.component.html',
    styleUrl: './booking-user.component.scss',
    providers: [DialogConfirmService],
})
export class BookingUserComponent implements OnInit, OnDestroy, AfterViewInit {
    constructor(
        private dialogConfirmService: DialogConfirmService,
        private listBooking: ListBooking_UserGQL,
        private updateBookingGQL: UpdateBookingGQL
    ) {}

    @ViewChild('grupBy') groupBy!: MatSelectionList;
    @ViewChild('status') status!: MatSelectionList;

    subscription = new Subscription();

    listBooking$!: Observable<ListBooking_UserQuery['listBooking_User']>;
    filteredListBooking$: Observable<ListBooking_UserQuery['listBooking_User']> = of([]);
    groupBy$ = new BehaviorSubject<'status' | 'none'>('none');
    statuList$ = new BehaviorSubject<BookingStatus[]>([]);

    selectOptionListStatus: { key: BookingStatus; name: string; visible: boolean }[] = [
        { key: BookingStatus.Scheduled, name: 'oczekuje', visible: true },
        { key: BookingStatus.Confirmed, name: 'do realizacji', visible: true },
        { key: BookingStatus.Completed, name: 'wykonano', visible: false },
        { key: BookingStatus.Canceled, name: 'anulowano', visible: false },
    ];

    hiddenStatusItem$!: Observable<BookingStatus[]>;

    log = console.log;

    ngOnInit() {
        this.listBooking$ = this.listBooking.watch().valueChanges.pipe(map(res => res.data.listBooking_User));

        this.filteredListBooking$ = this.filterListBooking();
        this.subscription.add(this.filteredListBooking$.subscribe());
    }

    ngAfterViewInit() {
        this.subscription.add(
            this.status.selectedOptions.changed
                .pipe(
                    map(val => val.source.selected.map(el => el.value)),
                    startWith(this.status.selectedOptions.selected.map(el => el.value)),
                    tap(val => this.log(val))
                )
                .subscribe(list => this.statuList$.next(list))
        );

        this.subscription.add(
            this.groupBy.selectedOptions.changed
                .pipe(
                    map(val => val.source.selected.map(el => el.value)[0]),
                    startWith(this.groupBy.selectedOptions.selected.map(el => el.value)[0]),
                    tap(val => this.log('group', val))
                )
                .subscribe(item => this.groupBy$.next(item))
        );
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    filterListBooking() {
        return combineLatest({
            groupBy: this.groupBy$,
            listBooking: this.listBooking$,
            statusList: this.statuList$,
        }).pipe(
            map(({ groupBy, listBooking, statusList }) => {
                console.log(statusList);

                if (statusList && statusList.length > 0) {
                    listBooking = listBooking.filter(item => statusList.includes(item.status as BookingStatus));
                }

                if (groupBy === 'status') {
                    return [
                        ...listBooking.filter(item => item.status === 'SCHEDULED'),
                        ...listBooking.filter(item => item.status === 'CONFIRMED'),
                        ...listBooking.filter(item => item.status === 'COMPLETED'),
                        ...listBooking.filter(item => item.status === 'CANCELED'),
                    ];
                }
                return listBooking;
            })
        );
    }

    openChangeStatusDialogConfirm(
        booking: ListBooking_UserQuery['listBooking_User'][number],
        customStatus?: BookingStatus
    ) {
        const { id: bookingId, status, offerForCompany, bookingDate } = booking;
        const offerName = offerForCompany?.customName;

        const _status = customStatus ? customStatus : status;

        if (!bookingId) {
            console.error('no booking ID');
            return;
        }

        let type: DialogConfirmType = 'confirmed';
        let dialogContent: DialogConfirmContent = {};

        if (_status === 'SCHEDULED') {
            type = 'confirmed';
            dialogContent = {
                message: `Potwierdzenie przyjęcia zlecenia`,
            };
        }

        if (_status === 'CONFIRMED') {
            type = 'danger';
            dialogContent = {
                message: `Anulowanie zlecenia`,
            };
        }

        if (_status === 'CANCELED') {
            type = 'confirmed';
            dialogContent = {
                message: `Przywrócenie zlecenia`,
            };
        }

        dialogContent.message = offerName ? dialogContent.message + `<br/>${offerName}` : dialogContent.message;
        dialogContent.message = bookingDate
            ? dialogContent.message + `<br/>${moment(bookingDate).locale('pl').format('dddd hh:mm, d MMM y')}`
            : dialogContent.message;

        this.dialogConfirmService
            .openConfirmDialog({ type: type, ...dialogContent })
            .pipe(
                filter(accept => !!accept),
                switchMap(() => {
                    return this.listBooking.fetch({}, { fetchPolicy: 'cache-only' }).pipe(
                        map(res => res.data.listBooking_User),
                        map(listBooking => listBooking.find(booking => booking.id === bookingId)),
                        switchMap(booking => {
                            const _status = customStatus
                                ? customStatus
                                : booking?.status !== BookingStatus.Confirmed
                                  ? BookingStatus.Confirmed
                                  : booking.status === BookingStatus.Confirmed
                                    ? BookingStatus.Canceled
                                    : BookingStatus.Scheduled;

                            console.log('update booking', _status, bookingId);

                            return this.updateBookingGQL.mutate(
                                {
                                    updateBookingId: bookingId,
                                    updateBookingInput: {
                                        status: _status,
                                    },
                                },
                                {
                                    refetchQueries: [
                                        {
                                            query: this.listBooking.document,
                                        },
                                    ],
                                }
                            );
                        })
                    );
                })
            )
            .subscribe();
    }

    protected readonly BookingStatus = BookingStatus;
}

export function req<T>(req: Observable<T>) {
    return req.pipe(map((res: any) => res['data']));
}

@Pipe({
    name: 'bookingStatus',
    standalone: true,
})
export class BookingStatusPipe implements PipeTransform {
    status: { [key in Types.BookingStatus]: string } = {
        CANCELED: 'anulowano',
        CONFIRMED: 'do realizacji',
        COMPLETED: 'wykonano',
        SCHEDULED: 'oczekuje',
    };

    transform(value?: Types.BookingStatus | null, ...args: any[]): any {
        if (!value) return value;
        return this.status[value];
    }
}
