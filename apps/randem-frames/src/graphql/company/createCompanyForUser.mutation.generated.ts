import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateCompanyForUserMutationVariables = Types.Exact<{
  createCompanyInput: Types.CreateCompanyInput;
}>;


export type CreateCompanyForUserMutation = { createCompanyForUser: { address: string, description?: string | null, email: string, id: string, imageId?: string | null, imageUrl?: string | null, name: string, phoneNumber?: string | null } };

export const CreateCompanyForUserDocument = gql`
    mutation CreateCompanyForUser($createCompanyInput: CreateCompanyInput!) {
  createCompanyForUser(createCompanyInput: $createCompanyInput) {
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
  export class CreateCompanyForUserGQL extends Apollo.Mutation<CreateCompanyForUserMutation, CreateCompanyForUserMutationVariables> {
    override document = CreateCompanyForUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }