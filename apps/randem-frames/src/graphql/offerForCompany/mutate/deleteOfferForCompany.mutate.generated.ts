import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteOfferForCompanyMutationVariables = Types.Exact<{
  deleteOfferForCompanyId: Types.Scalars['String']['input'];
}>;


export type DeleteOfferForCompanyMutation = { deleteOfferForCompany: boolean };

export const DeleteOfferForCompanyDocument = gql`
    mutation DeleteOfferForCompany($deleteOfferForCompanyId: String!) {
  deleteOfferForCompany(id: $deleteOfferForCompanyId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOfferForCompanyGQL extends Apollo.Mutation<DeleteOfferForCompanyMutation, DeleteOfferForCompanyMutationVariables> {
    override document = DeleteOfferForCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }