import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { CompanyTypeFieldsFragmentDoc } from './listCompany.query.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListCompanyForUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListCompanyForUserQuery = { listCompanyForUser: Array<{ address: string, description?: string | null, email: string, id: string, imageId?: string | null, imageUrl?: string | null, name: string, phoneNumber?: string | null, user?: { id: string, role: Types.UserRoleEnum, username: string } | null }> };

export const ListCompanyForUserDocument = gql`
    query ListCompanyForUser {
  listCompanyForUser {
    user {
      id
      role
      username
    }
    ...CompanyTypeFields
  }
}
    ${CompanyTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ListCompanyForUserGQL extends Apollo.Query<ListCompanyForUserQuery, ListCompanyForUserQueryVariables> {
    override document = ListCompanyForUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }