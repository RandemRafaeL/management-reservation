import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
export type DetailFullOfferFragment = { id: string, name: string, description?: string | null, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null };

export const DetailFullOfferFragmentDoc = gql`
    fragment DetailFullOffer on OfferType {
  id
  name
  description
  category {
    id
    name
    imageUrl
  }
  imageUrl
}
    `;