import * as Types from '../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListCompanyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListCompanyQuery = { listCompany: Array<{ address: string, description?: string | null, email: string, id: string, imageId?: string | null, imageUrl?: string | null, name: string, phoneNumber?: string | null, user?: { id: string, role: Types.UserRoleEnum, username: string } | null }> };

export type CompanyTypeFieldsFragment = { address: string, description?: string | null, email: string, id: string, imageId?: string | null, imageUrl?: string | null, name: string, phoneNumber?: string | null };

export const CompanyTypeFieldsFragmentDoc = gql`
    fragment CompanyTypeFields on CompanyType {
  address
  description
  email
  id
  imageId
  imageUrl
  name
  phoneNumber
}
    `;
export const ListCompanyDocument = gql`
    query ListCompany {
  listCompany {
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
  export class ListCompanyGQL extends Apollo.Query<ListCompanyQuery, ListCompanyQueryVariables> {
    override document = ListCompanyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }