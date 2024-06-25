import { QueryOptionsInput } from './pagination-sort.input';
import { Prisma } from '@prisma/client';

export function queryOptions(options?: QueryOptionsInput) {
    const { pagination, sort } = options || {};
    const { id, take } = pagination || {};
    let orderBy: Prisma.OfferTableOrderByWithRelationInput[] =
        sort?.map(({ field, order }) => ({ [field]: order })) || [];

    // Domyślne sortowanie, jeśli nie podano żadnych argumentów sortowania
    if (orderBy.length === 0) {
        orderBy = [{ createdAt: 'asc' }];
    }

    const cursor = id ? { id } : undefined;
    const skip = id ? 1 : 0;

    return {
        take,
        skip,
        cursor,
        orderBy,
    };
}
