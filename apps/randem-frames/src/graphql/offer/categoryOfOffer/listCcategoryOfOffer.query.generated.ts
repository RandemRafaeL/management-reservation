import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ListCategoryOfOfferQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ListCategoryOfOfferQuery = {
    listCategoryOfOffer: Array<{
        id: string;
        imageUrl?: string | null;
        name: string;
        offers?: Array<{ id: string; name: string; imageUrl: string }> | null;
    }>;
};

export const ListCategoryOfOfferDocument = gql`
    query ListCategoryOfOffer {
        listCategoryOfOffer {
            id
            imageUrl
            name
            offers {
                id
                name
                imageUrl
            }
        }
    }
`;

@Injectable({
    providedIn: 'root',
})
export class ListCategoryOfOfferGQL extends Apollo.Query<ListCategoryOfOfferQuery, ListCategoryOfOfferQueryVariables> {
    override document = ListCategoryOfOfferDocument;

    constructor(apollo: Apollo.Apollo) {
        super(apollo);
    }
}
