import { Field, InputType, Int } from '@nestjs/graphql';
import { SortOrderEnum } from './enums-graphql';

@InputType()
export class PaginationInput {
    @Field(() => Int, { nullable: true, defaultValue: 10 })
    take: number;

    @Field(() => String, { nullable: true })
    id?: string;
}

@InputType()
export class SortInput {
    @Field()
    field: string;

    @Field(() => SortOrderEnum)
    order: SortOrderEnum;
}

@InputType()
export class QueryOptionsInput {
    @Field(() => PaginationInput, { nullable: true })
    pagination?: PaginationInput;

    @Field(() => [SortInput], { nullable: true })
    sort?: SortInput[];
}
