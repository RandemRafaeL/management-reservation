import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteCompanyMutationVariables = Types.Exact<{
  removeCompanyId: Types.Scalars['String']['input'];
}>;


export type DeleteCompanyMutation = { deleteCompany: { id: string } };

export const DeleteCompanyDocument = gql`
    mutation DeleteCompany($removeCompanyId: String!) {
  deleteCompany(id: $removeCompanyId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCompanyGQL extends Apollo.Mutation<DeleteCompanyMutation, DeleteCompanyMutationVariables> {
    override document = DeleteCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }