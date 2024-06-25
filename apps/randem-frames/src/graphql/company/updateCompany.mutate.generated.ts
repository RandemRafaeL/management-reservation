import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateCompanyMutationVariables = Types.Exact<{
  updateCompanyId: Types.Scalars['String']['input'];
  updateCompanyInput: Types.UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { updateCompany: { id: string, name: string, address: string, email: string, phoneNumber?: string | null, description?: string | null, imageId?: string | null, imageUrl?: string | null, user?: { id: string, role: Types.UserRoleEnum, username: string } | null } };

export const UpdateCompanyDocument = gql`
    mutation UpdateCompany($updateCompanyId: String!, $updateCompanyInput: UpdateCompanyInput!) {
  updateCompany(id: $updateCompanyId, updateCompanyInput: $updateCompanyInput) {
    id
    name
    address
    email
    phoneNumber
    description
    imageId
    imageUrl
    user {
      id
      role
      username
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCompanyGQL extends Apollo.Mutation<UpdateCompanyMutation, UpdateCompanyMutationVariables> {
    override document = UpdateCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }