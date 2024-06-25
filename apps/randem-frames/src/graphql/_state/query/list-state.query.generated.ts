import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListStateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListStateQuery = { listState: Array<{ id: string, key: string, userId: string, value: any }> };

export const ListStateDocument = gql`
    query ListState {
  listState {
    id
    key
    userId
    value
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ListStateGQL extends Apollo.Query<ListStateQuery, ListStateQueryVariables> {
    override document = ListStateDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }