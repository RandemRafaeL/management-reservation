import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateCompanyMutationVariables = Types.Exact<{
  createCompanyInput: Types.CreateCompanyInput;
}>;


export type CreateCompanyMutation = { createCompany: { address: string, description?: string | null, email: string, id: string, imageId?: string | null, imageUrl?: string | null, name: string, phoneNumber?: string | null } };

export const CreateCompanyDocument = gql`
    mutation CreateCompany($createCompanyInput: CreateCompanyInput!) {
  createCompany(createCompanyInput: $createCompanyInput) {
    address
    description
    email
    id
    imageId
    imageUrl
    name
    phoneNumber
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCompanyGQL extends Apollo.Mutation<CreateCompanyMutation, CreateCompanyMutationVariables> {
    override document = CreateCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }