import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullEmployeeFragmentDoc } from '../fragment/detailFullEmployee.fragmnet.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetEmployeeQueryVariables = Types.Exact<{
  employeeId: Types.Scalars['String']['input'];
}>;


export type GetEmployeeQuery = { getEmployee?: { id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null } | null };

export const GetEmployeeDocument = gql`
    query getEmployee($employeeId: String!) {
  getEmployee(id: $employeeId) {
    ...DetailFullEmployee
  }
}
    ${DetailFullEmployeeFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEmployeeGQL extends Apollo.Query<GetEmployeeQuery, GetEmployeeQueryVariables> {
    override document = GetEmployeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }