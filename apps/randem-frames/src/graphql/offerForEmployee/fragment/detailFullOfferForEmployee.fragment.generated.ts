import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
import { DetailFullEmployeeFragmentDoc } from '../../employee/fragment/detailFullEmployee.fragmnet.generated';
import { DetailFullOfferForCompanyFragmentDoc } from '../../offerForCompany/fragment/detailFullOfferForCompany.fragment.generated';
export type DetailFullOfferForEmployeeFragment = { id: string, employee?: { id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null } | null, offerForCompany?: { id: string, customName?: string | null, customDescription?: string | null, customImageUrl?: string | null, duration: string, price: number, availability: boolean, company?: { id: string, name: string, imageId?: string | null, imageUrl?: string | null } | null, offer?: { id: string, name: string, imageUrl: string, category?: { id: string, name: string, imageUrl?: string | null } | null } | null } | null, booking?: { id?: string | null } | null };

export const DetailFullOfferForEmployeeFragmentDoc = gql`
    fragment DetailFullOfferForEmployee on OfferForEmployeeType {
  id
  employee {
    ...DetailFullEmployee
  }
  offerForCompany {
    ...DetailFullOfferForCompany
  }
  booking {
    id
  }
}
    ${DetailFullEmployeeFragmentDoc}
${DetailFullOfferForCompanyFragmentDoc}`;