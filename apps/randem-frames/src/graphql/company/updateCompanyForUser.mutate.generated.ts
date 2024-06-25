import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateCompanyForUserMutationVariables = Types.Exact<{
  updateCompanyId: Types.Scalars['String']['input'];
  updateCompanyForUserInput: Types.UpdateCompanyInput;
}>;


export type UpdateCompanyForUserMutation = { updateCompanyForUser: { id: string, name: string, address: string, email: string, phoneNumber?: string | null, description?: string | null, imageId?: string | null, imageUrl?: string | null, user?: { id: string, role: Types.UserRoleEnum, username: string } | null } };

export const UpdateCompanyForUserDocument = gql`
    mutation UpdateCompanyForUser($updateCompanyId: String!, $updateCompanyForUserInput: UpdateCompanyInput!) {
  updateCompanyForUser(
    id: $updateCompanyId
    updateCompanyForUserInput: $updateCompanyForUserInput
  ) {
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
  export class UpdateCompanyForUserGQL extends Apollo.Mutation<UpdateCompanyForUserMutation, UpdateCompanyForUserMutationVariables> {
    override document = UpdateCompanyForUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }