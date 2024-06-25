import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullOfferForCompanyFragmentDoc } from '../fragment/detailFullOfferForCompany.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateOfferForCompanyMutationVariables = Types.Exact<{
  createOfferForCompanyInput: Types.CreateOfferForCompanyInput;
}>;


export type CreateOfferForCompanyMutation = { createOfferForCompany: { id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null } };

export const CreateOfferForCompanyDocument = gql`
    mutation CreateOfferForCompany($createOfferForCompanyInput: CreateOfferForCompanyInput!) {
  createOfferForCompany(createOfferForCompanyInput: $createOfferForCompanyInput) {
    ...DetailFullOfferForCompany
  }
}
    ${DetailFullOfferForCompanyFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOfferForCompanyGQL extends Apollo.Mutation<CreateOfferForCompanyMutation, CreateOfferForCompanyMutationVariables> {
    override document = CreateOfferForCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }