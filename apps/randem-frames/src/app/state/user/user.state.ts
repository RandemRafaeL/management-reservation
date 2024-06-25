import { Company } from '../../modules/company/company.models';
import { GraphQLError } from 'graphql/error';
import { ApolloError } from 'apollo-server-express';
import { UserRoleEnum } from '../../../graphql/_generated/types';

export interface UserState {
    id: string | null;
    username: string;
    role: (typeof UserRoleEnum)[keyof typeof UserRoleEnum] | null;
    company?: Company[];
    _error?: GraphQLError | ApolloError;
    _isLoading: boolean;
}

export const initialState: UserState = {
    id: null,
    username: '',
    role: null,
    _error: undefined,
    _isLoading: false,
};
