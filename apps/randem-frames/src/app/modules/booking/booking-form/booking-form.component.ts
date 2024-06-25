import { Component, Inject, OnInit, Optional, signal, WritableSignal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BookingType, CreateBookingInput, UpdateBookingInput } from '../../../../graphql/_generated/types';
import { BookingFormService, BookingKeysToControl } from './booking-form.service';
import { CreateBookingGQL } from '../../../../graphql/booking/mutate/createBooking.mutate.generated';
import { UpdateBookingGQL } from '../../../../graphql/booking/mutate/updateBooking.mutate.generated';
import { map, switchMap } from 'rxjs/operators';
import { GetBookingGQL } from '../../../../graphql/booking/query/getBooking.query.generated';
import { ControlAppearanceAutoForm, updateAppearanceAutoForm } from '@randem-frames/ui-rl';
import { ListOfferForCompanyGQL } from '../../../../graphql/offerForCompany/query/listOfferForCompany.query.generated';
import { ListCustomerGQL } from '../../../../graphql/customer/query/listCustomer.query.generated';
import {
    ListOfferForEmployeesGQL,
    ListOfferForEmployeesQuery,
} from '../../../../graphql/offerForEmployee/query/listOfferForEmployee.query.generated';
import * as moment from 'moment';
import { ListCategoryOfOfferGQL } from '../../../../graphql/offer/categoryOfOffer/listCcategoryOfOffer.query.generated';
import { ListCompanyGQL } from '../../../../graphql/company/listCompany.query.generated';
import { ListEmployees_UserGQL } from '../../../../graphql/employee/query/listEmployee.query.generated';
import { distinctUntilChanged, combineLatest, startWith, tap, Observable } from 'rxjs';
import { GetAllOffersGQL } from '../../../../graphql/offer/query/getOffers.query.generated';
import { uniqBy } from 'lodash-es';
import { ListBooking_UserGQL } from '../../../../graphql/booking/query/listBooking_user.query.generated';

const dateFormat = 'YYYY-MM-DD HH:mm';

@Component({
    selector: 'randem-frames-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent implements OnInit {
    constructor(
        @Optional()
        public dialogRef: DialogRef<BookingType, BookingFormComponent>,
        @Inject(DIALOG_DATA) public dialogData: { bookingId: string },
        private bookingFormService: BookingFormService,
        private listBookingGQL: ListBooking_UserGQL,
        private getBookingGQL: GetBookingGQL,
        private createBookingGQL: CreateBookingGQL,
        private updateBookingGQL: UpdateBookingGQL,
        private listCustomerGQL: ListCustomerGQL,
        private listOfferForCompanyGQL: ListOfferForCompanyGQL,
        private listOfferForEmployeesGQL: ListOfferForEmployeesGQL,
        private listCategoryOfOfferGQL: ListCategoryOfOfferGQL,
        private listCompanyGQL: ListCompanyGQL,
        private listEmployeesGQL: ListEmployees_UserGQL,
        private getAllOffersGQL: GetAllOffersGQL
    ) {}

    bookingFromGroup = this.bookingFormService.autoFormGroup;
    bookingAppearance!: WritableSignal<ControlAppearanceAutoForm<CreateBookingInput & BookingKeysToControl>>;

    ngOnInit() {
        const bookingId = this.dialogData.bookingId;
        if (bookingId) {
            this.getBookingGQL //
                .fetch({ getBookingId: bookingId })
                .pipe(map(res => res.data.getBooking))
                .subscribe(booking => {
                    const {
                        customer,
                        offerForEmployee,
                        offerForCompany,
                        status,
                        bookingDate, //
                    } = booking;

                    const formattedDate = moment(bookingDate).format(dateFormat); // Formatowanie do 'datetime-local'
                    console.log('formattedDate', formattedDate);
                    this.bookingFromGroup.get('bookingDate')?.patchValue(formattedDate);

                    const pathBooking: UpdateBookingInput = {
                        customerId: customer?.id || '',
                        offerForEmployeeId: offerForEmployee?.id || '',
                        offerForCompanyId: offerForCompany?.id || '',
                        bookingDate: formattedDate,
                        status,
                    };
                    console.log('booking', bookingId, pathBooking);

                    this.bookingFromGroup.patchValue(pathBooking);
                });
        } else {
            const formattedDate = moment().format(dateFormat); // Formatowanie do 'datetime-local'
            console.log('formattedDate', formattedDate);
            this.bookingFromGroup.get('bookingDate')?.patchValue(formattedDate);
        }

        this.bookingAppearance = signal(
            updateAppearanceAutoForm(this.bookingFormService.appearance)
                .createSelect(
                    'customerId', //
                    this.listCustomerGQL.fetch().pipe(map(res => res.data.listCustomer))
                )
                .createSelect(
                    'offerForCompanyId',
                    this.listOfferForCompanyGQL.fetch().pipe(
                        map(res => res.data.listOffersForCompany),
                        switchMap(list => {
                            const c = this.bookingFromGroup.controls;
                            return combineLatest([
                                c['_offerId'].valueChanges.pipe(startWith(null)),
                                c['_companyId'].valueChanges.pipe(startWith(null)),
                            ]).pipe(
                                map(([offerId, companyId]) =>
                                    list
                                        .filter(item => (offerId ? item.offer?.id === offerId : item))
                                        .filter(item => (companyId ? item.company?.id === companyId : item))
                                        .map(offerCompany => ({
                                            id: offerCompany.id,
                                            name: offerCompany.customName,
                                        }))
                                ),
                                tap(list => {
                                    const c_offerCompanyId = this.bookingFromGroup.controls['offerForCompanyId'];
                                    list.includes(c_offerCompanyId.value) || c_offerCompanyId.reset();
                                })
                            );
                        })
                    )
                )
                .createSelect(
                    'offerForEmployeeId',
                    this.listOfferForEmployeesGQL.fetch().pipe(
                        map(res => [
                            ...(res.data?.listOfferForEmployees || []).map(offerEmployee => ({
                                id: offerEmployee.id,
                                name: offerEmployee.offerForCompany?.offer?.name,
                            })),
                            { id: '', name: 'brak' },
                        ])
                    )
                )
                .createSelect(
                    '_categoryId',
                    this.listOfferForCompanyGQL.fetch().pipe(
                        map(res => res.data.listOffersForCompany),
                        map(list =>
                            list.map(offerCompany => ({
                                id: offerCompany.offer?.category?.id,
                                name: offerCompany.offer?.category?.name,
                            }))
                        ),
                        map(list => uniqBy(list, 'id'))
                    )
                )
                .createSelect(
                    '_companyId',
                    this.listOfferForCompanyGQL.fetch().pipe(
                        map(res => res.data.listOffersForCompany),
                        switchMap(list => {
                            const c = this.bookingFromGroup.controls;
                            return combineLatest([c['_offerId'].valueChanges.pipe(startWith(null))]).pipe(
                                map(([offerId]) => {
                                    return list
                                        .filter(offerCompany =>
                                            offerId ? offerCompany.offer?.id === offerId : offerCompany
                                        )
                                        .map(offerCompany => ({
                                            id: offerCompany.company?.id,
                                            name: offerCompany.company?.name,
                                        }));
                                }),
                                map(list => uniqBy(list, 'id')),
                                tap(list => {
                                    const c_companyId = this.bookingFromGroup.controls['_companyId'];
                                    list.includes(c_companyId.value) || c_companyId.reset();
                                })
                            );
                        })
                    )
                )
                .createSelect(
                    // TODO do zrobienia
                    '_employeeId',
                    this.listOfferForEmployeesGQL.fetch().pipe(
                        map(res => res.data.listOfferForEmployees),
                        switchMap(list =>
                            combineLatest([
                                this.bookingFromGroup.controls['offerForCompanyId'].valueChanges.pipe(startWith(null)),
                                this.bookingFromGroup.controls['_offerId'].valueChanges.pipe(startWith(null)),
                            ]).pipe(
                                map(([offerCompanyId, offerId]) => {
                                    console.log('OFFERS', offerId, offerCompanyId);
                                    return list
                                        .filter(item => (offerId ? item.offerForCompany?.offer?.id === offerId : item))
                                        .filter(item =>
                                            offerCompanyId ? item.offerForCompany?.id === offerCompanyId : item
                                        )
                                        .map(offerEmployee => ({
                                            id: offerEmployee.employee?.id,
                                            name: `${offerEmployee.employee?.firstName} ${offerEmployee.employee?.lastName}`,
                                        }));
                                }),
                                map(list => {
                                    console.log('OFFERS LIST', list);
                                    return uniqBy(list, 'id');
                                }),
                                tap(list => {
                                    const c_employeeId = this.bookingFromGroup.controls['_employeeId'];
                                    list.includes(c_employeeId.value) || c_employeeId.reset();
                                })
                            )
                        )
                    )
                )
                .createSelect(
                    '_offerId',
                    this.listOfferForCompanyGQL.fetch().pipe(
                        map(res => res.data.listOffersForCompany),
                        switchMap(offersCompany => {
                            return this.bookingFromGroup.controls['_categoryId'].valueChanges.pipe(
                                startWith(null),
                                map(categoryId => {
                                    return offersCompany
                                        .filter(item => {
                                            return categoryId ? item.offer?.category?.id === categoryId : item;
                                        })
                                        .map(item => ({
                                            id: item.offer?.id,
                                            name: item.offer?.name,
                                        }));
                                }),
                                map(list => uniqBy(list, 'id')),
                                tap(list => {
                                    const c_offerId = this.bookingFromGroup.controls['_offerId'];
                                    list.includes(c_offerId.value) || c_offerId.reset();
                                })
                            );
                        })
                    )
                )
                .addSignals().appearance
        );

        combineLatest({
            offerId: this.bookingFromGroup.controls['_offerId'].valueChanges.pipe(
                startWith(null),
                distinctUntilChanged()
            ),
        }).subscribe(({ offerId }) => {
            if (offerId) {
                this.bookingAppearance.update(app => {
                    app._companyId.disabled_?.set(false);
                    app.offerForCompanyId.disabled_?.set(false);
                    app.offerForEmployeeId.disabled_?.set(false);
                    app._employeeId.disabled_?.set(false);
                    return app;
                });
            } else {
                this.bookingAppearance.update(app => {
                    app._companyId.disabled_?.set(true);
                    app.offerForCompanyId.disabled_?.set(true);
                    app.offerForEmployeeId.disabled_?.set(true);
                    app._employeeId.disabled_?.set(true);
                    return app;
                });
            }
        });

        this.bookingFromGroup.controls['_employeeId'].valueChanges
            .pipe(
                switchMap(employeeId =>
                    this.listOfferForEmployeesGQL.fetch().pipe(
                        map(res => res.data.listOfferForEmployees),
                        map(list => {
                            const offerForCompanyId = this.bookingFromGroup.controls['offerForCompanyId'].value;
                            return list.find(
                                item =>
                                    item.employee?.id === employeeId && item.offerForCompany?.id === offerForCompanyId
                            )?.id;
                        })
                    )
                )
            )
            .subscribe(
                offerForEmployeeId =>
                    this.bookingFromGroup.controls['offerForEmployeeId']?.patchValue(offerForEmployeeId)
            );
    }

    closeDialog() {
        this.bookingFromGroup.reset();
        this.dialogRef.close();
    }

    createBooking() {
        console.log('createBooking', this.bookingFromGroup.value);

        const employeeId = this.bookingFromGroup.controls['_employeeId'].value;
        const offerForCompanyId = this.bookingFromGroup.controls['offerForCompanyId'].value;

        const offerForEmployee$: Observable<ListOfferForEmployeesQuery['listOfferForEmployees'][number]> =
            this.listOfferForEmployeesGQL.fetch().pipe(
                map(res => res.data.listOfferForEmployees),
                map(list =>
                    list.find(
                        item => item.employee?.id === employeeId && item.offerForCompany?.id === offerForCompanyId
                    )
                )
            ) as Observable<ListOfferForEmployeesQuery['listOfferForEmployees'][number]>;

        offerForEmployee$.subscribe(offer => console.dir(offer));

        this.createBookingGQL
            .mutate(
                { createBookingInput: this.bookingFormService.createInput },
                {
                    refetchQueries: [
                        {
                            query: this.listBookingGQL.document,
                        },
                    ],
                }
            )
            .pipe()
            .subscribe(() => this.closeDialog());
    }

    updateBooking() {
        const bookingId = this.dialogData.bookingId;
        if (!bookingId) {
            console.log('booking id is null');
            return;
        }

        console.log('updateBooking', this.bookingFromGroup.value);

        this.updateBookingGQL
            .mutate(
                { updateBookingId: bookingId, updateBookingInput: this.bookingFormService.updateInput },
                {
                    refetchQueries: [
                        {
                            query: this.listBookingGQL.document,
                        },
                    ],
                }
            )
            .subscribe(() => this.closeDialog());
    }
}
