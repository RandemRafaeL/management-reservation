import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DefaultBookingFragmentDoc } from '../fragment/defaultBooking.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetBookingQueryVariables = Types.Exact<{
  getBookingId: Types.Scalars['String']['input'];
}>;


export type GetBookingQuery = { getBooking: { id?: string | null, bookingDate?: any | null, status?: Types.BookingStatus | null, offerForCompany?: { id: string, customName?: string | null, customImageUrl?: string | null, company?: { name: string, imageUrl?: string | null, imageId?: string | null } | null, offer?: { id: string, name: string } | null } | null, offerForEmployee?: { id: string, offerForCompany?: { id: string, offer?: { id: string, name: string } | null } | null, employee?: { id: string, firstName: string, lastName: string, imageUrl?: string | null } | null } | null, customer?: { id: string, name: string, email: string, phone?: string | null } | null } };

export const GetBookingDocument = gql`
    query getBooking($getBookingId: String!) {
  getBooking(id: $getBookingId) {
    ...DefaultBooking
  }
}
    ${DefaultBookingFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBookingGQL extends Apollo.Query<GetBookingQuery, GetBookingQueryVariables> {
    override document = GetBookingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }