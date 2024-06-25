import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
export type FullCustomerFragment = { id: string, name: string, email: string, phone?: string | null, bookings?: Array<{ offerForCompany?: { offer?: { name: string } | null } | null, offerForEmployee?: { offerForCompany?: { offer?: { name: string } | null } | null } | null } | null> | null };

export const FullCustomerFragmentDoc = gql`
    fragment FullCustomer on CustomerType {
  id
  name
  email
  phone
  bookings {
    offerForCompany {
      offer {
        name
      }
    }
    offerForEmployee {
      offerForCompany {
        offer {
          name
        }
      }
    }
  }
}
    `;