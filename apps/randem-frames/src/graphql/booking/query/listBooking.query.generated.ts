import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DefaultBookingFragmentDoc } from '../fragment/defaultBooking.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListBookingQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListBookingQuery = { listBookings: Array<{ id?: string | null, bookingDate?: any | null, status?: Types.BookingStatus | null, offerForCompany?: { id: string, customName?: string | null, customImageUrl?: string | null, company?: { name: string, imageUrl?: string | null, imageId?: string | null } | null, offer?: { id: string, name: string } | null } | null, offerForEmployee?: { id: string, offerForCompany?: { id: string, offer?: { id: string, name: string } | null } | null, employee?: { id: string, firstName: string, lastName: string, imageUrl?: string | null } | null } | null, customer?: { id: string, name: string, email: string, phone?: string | null } | null }> };

export const ListBookingDocument = gql`
    query ListBooking {
  listBookings {
    ...DefaultBooking
  }
}
    ${DefaultBookingFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ListBookingGQL extends Apollo.Query<ListBookingQuery, ListBookingQueryVariables> {
    override document = ListBookingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }