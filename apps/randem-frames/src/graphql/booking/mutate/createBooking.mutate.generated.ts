import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DefaultBookingFragmentDoc } from '../fragment/defaultBooking.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateBookingMutationVariables = Types.Exact<{
  createBookingInput: Types.CreateBookingInput;
}>;


export type CreateBookingMutation = { createBooking: { id?: string | null, bookingDate?: any | null, status?: Types.BookingStatus | null, offerForCompany?: { id: string, customName?: string | null, customImageUrl?: string | null, company?: { name: string, imageUrl?: string | null, imageId?: string | null } | null, offer?: { id: string, name: string } | null } | null, offerForEmployee?: { id: string, offerForCompany?: { id: string, offer?: { id: string, name: string } | null } | null, employee?: { id: string, firstName: string, lastName: string, imageUrl?: string | null } | null } | null, customer?: { id: string, name: string, email: string, phone?: string | null } | null } };

export const CreateBookingDocument = gql`
    mutation CreateBooking($createBookingInput: CreateBookingInput!) {
  createBooking(createBookingInput: $createBookingInput) {
    ...DefaultBooking
  }
}
    ${DefaultBookingFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBookingGQL extends Apollo.Mutation<CreateBookingMutation, CreateBookingMutationVariables> {
    override document = CreateBookingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }