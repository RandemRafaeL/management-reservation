import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferForCompanyFragmentDoc } from '../fragment/detailFullOfferForCompany.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateOfferForCompanyMutationVariables = Types.Exact<{
  updateOfferForCompanyId: Types.Scalars['String']['input'];
  updateOfferForCompanyInput: Types.UpdateOfferForCompanyInput;
}>;


export type UpdateOfferForCompanyMutation = { updateOfferForCompany: { id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null } };

export const UpdateOfferForCompanyDocument = gql`
    mutation UpdateOfferForCompany($updateOfferForCompanyId: String!, $updateOfferForCompanyInput: UpdateOfferForCompanyInput!) {
  updateOfferForCompany(
    id: $updateOfferForCompanyId
    updateOfferForCompanyInput: $updateOfferForCompanyInput
  ) {
    ...DetailFullOfferForCompany
  }
}
    ${DetailFullOfferForCompanyFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOfferForCompanyGQL extends Apollo.Mutation<UpdateOfferForCompanyMutation, UpdateOfferForCompanyMutationVariables> {
    override document = UpdateOfferForCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }