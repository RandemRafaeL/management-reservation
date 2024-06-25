import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullEmployeeFragmentDoc } from '../fragment/detailFullEmployee.fragmnet.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateEmployeeMutationVariables = Types.Exact<{
  createEmployeeInput: Types.CreateEmployeeInput;
}>;


export type CreateEmployeeMutation = { createEmployee: { id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null } };

export const CreateEmployeeDocument = gql`
    mutation CreateEmployee($createEmployeeInput: CreateEmployeeInput!) {
  createEmployee(createEmployeeInput: $createEmployeeInput) {
    ...DetailFullEmployee
  }
}
    ${DetailFullEmployeeFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateEmployeeGQL extends Apollo.Mutation<CreateEmployeeMutation, CreateEmployeeMutationVariables> {
    override document = CreateEmployeeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }