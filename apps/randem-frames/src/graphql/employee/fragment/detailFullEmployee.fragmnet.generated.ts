import * as Types from '../../_generated/types';

import { gql } from 'apollo-angular';
export type DetailFullEmployeeFragment = { id: string, imageUrl?: string | null, email: string, firstName: string, isActive: boolean, lastName: string, phoneNumber?: string | null, position: string, company?: { id: string, name: string } | null };

export const DetailFullEmployeeFragmentDoc = gql`
    fragment DetailFullEmployee on EmployeeType {
  company {
    id
    name
  }
  id
  imageUrl
  email
  firstName
  isActive
  lastName
  phoneNumber
  position
}
    `;