import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullEmployeeFragmentDoc } from '../fragment/detailFullEmployee.fragmnet.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListEmployees_UserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListEmployees_UserQuery = { listEmployee_User: Array<{ id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null }> };

export const ListEmployees_UserDocument = gql`
    query ListEmployees_User {
  listEmployee_User {
    ...DetailFullEmployee
  }
}
    ${DetailFullEmployeeFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ListEmployees_UserGQL extends Apollo.Query<ListEmployees_UserQuery, ListEmployees_UserQueryVariables> {
    override document = ListEmployees_UserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }