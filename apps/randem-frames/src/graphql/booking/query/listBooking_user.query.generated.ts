import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DefaultBookingFragmentDoc } from '../fragment/defaultBooking.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListBooking_UserQueryVariables = Types.Exact<{
    options?: Types.InputMaybe<Types.QueryOptionsInput>;
}>;

export type ListBooking_UserQuery = {
    listBooking_User: Array<{
        id?: string | null;
        bookingDate?: any | null;
        status?: Types.BookingStatus | null;
        offerForCompany?: {
            id: string;
            customName?: string | null;
            customImageUrl?: string | null;
            company?: { name: string; imageUrl?: string | null; imageId?: string | null } | null;
            offer?: { id: string; name: string } | null;
        } | null;
        offerForEmployee?: {
            id: string;
            offerForCompany?: { id: string; offer?: { id: string; name: string } | null } | null;
            employee?: { id: string; firstName: string; lastName: string; imageUrl?: string | null } | null;
        } | null;
        customer?: { id: string; name: string; email: string; phone?: string | null } | null;
    }>;
};

export const ListBooking_UserDocument = gql`
    query ListBooking_User($options: QueryOptionsInput) {
        listBooking_User(options: $options) {
            ...DefaultBooking
        }
    }
    ${DefaultBookingFragmentDoc}
`;

@Injectable({
    providedIn: 'root',
})
export class ListBooking_UserGQL extends Apollo.Query<ListBooking_UserQuery, ListBooking_UserQueryVariables> {
    override document = ListBooking_UserDocument;

    constructor(apollo: Apollo.Apollo) {
        super(apollo);
    }
}
