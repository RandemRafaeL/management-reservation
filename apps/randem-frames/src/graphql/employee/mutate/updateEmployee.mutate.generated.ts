import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullEmployeeFragmentDoc } from '../fragment/detailFullEmployee.fragmnet.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateEmployeeMutationVariables = Types.Exact<{
  updateEmployeeId: Types.Scalars['String']['input'];
  updateEmployeeInput: Types.UpdateEmployeeInput;
}>;


export type UpdateEmployeeMutation = { updateEmployee: { id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null } };

export const UpdateEmployeeDocument = gql`
    mutation UpdateEmployee($updateEmployeeId: String!, $updateEmployeeInput: UpdateEmployeeInput!) {
  updateEmployee(id: $updateEmployeeId, updateEmployeeInput: $updateEmployeeInput) {
    ...DetailFullEmployee
  }
}
    ${DetailFullEmployeeFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateEmployeeGQL extends Apollo.Mutation<UpdateEmployeeMutation, UpdateEmployeeMutationVariables> {
    override document = UpdateEmployeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }