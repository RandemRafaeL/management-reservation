import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
export type DetailFullOfferForCompanyFragment = { id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null };

export const DetailFullOfferForCompanyFragmentDoc = gql`
    fragment DetailFullOfferForCompany on OfferForCompanyType {
  id
  customName
  customDescription
  customImageUrl
  duration
  price
  availability
  company {
    id
    name
    imageId
    imageUrl
  }
  offer {
    id
    name
    imageUrl
    category {
      id
      name
      imageUrl
    }
  }
}
    `;