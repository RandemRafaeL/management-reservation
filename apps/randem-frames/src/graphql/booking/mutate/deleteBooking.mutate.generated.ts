import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteBookingMutationVariables = Types.Exact<{
  deleteBookingId: Types.Scalars['String']['input'];
}>;


export type DeleteBookingMutation = { deleteBooking: { id?: string | null } };

export const DeleteBookingDocument = gql`
    mutation DeleteBooking($deleteBookingId: String!) {
  deleteBooking(id: $deleteBookingId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteBookingGQL extends Apollo.Mutation<DeleteBookingMutation, DeleteBookingMutationVariables> {
    override document = DeleteBookingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }