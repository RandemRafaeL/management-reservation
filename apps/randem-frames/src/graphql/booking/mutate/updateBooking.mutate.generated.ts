import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DefaultBookingFragmentDoc } from '../fragment/defaultBooking.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateBookingMutationVariables = Types.Exact<{
  updateBookingId: Types.Scalars['String']['input'];
  updateBookingInput: Types.UpdateBookingInput;
}>;


export type UpdateBookingMutation = { updateBooking: { id?: string | null, bookingDate?: any | null, status?: Types.BookingStatus | null, offerForCompany?: { id: string, customName?: string | null, customImageUrl?: string | null, company?: { name: string, imageUrl?: string | null, imageId?: string | null } | null, offer?: { id: string, name: string } | null } | null, offerForEmployee?: { id: string, offerForCompany?: { id: string, offer?: { id: string, name: string } | null } | null, employee?: { id: string, firstName: string, lastName: string, imageUrl?: string | null } | null } | null, customer?: { id: string, name: string, email: string, phone?: string | null } | null } };

export const UpdateBookingDocument = gql`
    mutation UpdateBooking($updateBookingId: String!, $updateBookingInput: UpdateBookingInput!) {
  updateBooking(id: $updateBookingId, updateBookingInput: $updateBookingInput) {
    ...DefaultBooking
  }
}
    ${DefaultBookingFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBookingGQL extends Apollo.Mutation<UpdateBookingMutation, UpdateBookingMutationVariables> {
    override document = UpdateBookingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }