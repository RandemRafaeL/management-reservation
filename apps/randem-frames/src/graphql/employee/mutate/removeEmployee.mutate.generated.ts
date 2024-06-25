import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeleteEmployeeMutationVariables = Types.Exact<{
  deleteEmployeeId: Types.Scalars['String']['input'];
}>;


export type DeleteEmployeeMutation = { deleteEmployee: boolean };

export const DeleteEmployeeDocument = gql`
    mutation DeleteEmployee($deleteEmployeeId: String!) {
  deleteEmployee(id: $deleteEmployeeId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteEmployeeGQL extends Apollo.Mutation<DeleteEmployeeMutation, DeleteEmployeeMutationVariables> {
    override document = DeleteEmployeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }