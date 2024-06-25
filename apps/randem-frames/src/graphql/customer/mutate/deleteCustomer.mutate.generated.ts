import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteCustomerMutationVariables = Types.Exact<{
  deleteCustomerId: Types.Scalars['String']['input'];
}>;


export type DeleteCustomerMutation = { deleteCustomer: { id: string, name: string } };

export const DeleteCustomerDocument = gql`
    mutation DeleteCustomer($deleteCustomerId: String!) {
  deleteCustomer(id: $deleteCustomerId) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCustomerGQL extends Apollo.Mutation<DeleteCustomerMutation, DeleteCustomerMutationVariables> {
    override document = DeleteCustomerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }