import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteOfferForEmployeeMutationVariables = Types.Exact<{
  deleteOfferForEmployeeId: Types.Scalars['String']['input'];
}>;


export type DeleteOfferForEmployeeMutation = { deleteOfferForEmployee: { id: string } };

export const DeleteOfferForEmployeeDocument = gql`
    mutation DeleteOfferForEmployee($deleteOfferForEmployeeId: String!) {
  deleteOfferForEmployee(id: $deleteOfferForEmployeeId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOfferForEmployeeGQL extends Apollo.Mutation<DeleteOfferForEmployeeMutation, DeleteOfferForEmployeeMutationVariables> {
    override document = DeleteOfferForEmployeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }