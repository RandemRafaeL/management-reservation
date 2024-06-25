import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
export type DefaultBookingFragment = { id?: string | null, bookingDate?: any | null, status?: Types.BookingStatus | null, offerForCompany?: { id: string, customName?: string | null, customImageUrl?: string | null, company?: { name: string, imageUrl?: string | null, imageId?: string | null } | null, offer?: { id: string, name: string } | null } | null, offerForEmployee?: { id: string, offerForCompany?: { id: string, offer?: { id: string, name: string } | null } | null, employee?: { id: string, firstName: string, lastName: string, imageUrl?: string | null } | null } | null, customer?: { id: string, name: string, email: string, phone?: string | null } | null };

export const DefaultBookingFragmentDoc = gql`
    fragment DefaultBooking on BookingType {
  id
  offerForCompany {
    id
    customName
    customImageUrl
    company {
      name
      imageUrl
      imageId
    }
    offer {
      id
      name
    }
  }
  offerForEmployee {
    id
    offerForCompany {
      id
      offer {
        id
        name
      }
    }
    employee {
      id
      firstName
      lastName
      imageUrl
    }
  }
  bookingDate
  customer {
    id
    name
    email
    phone
  }
  status
}
    `;