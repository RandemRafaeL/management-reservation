import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class StateInput {
    @Field()
    key: string;

    @Field(() => GraphQLJSON, { nullable: true })
    value: any;

    @Field({ nullable: true })
    userId?: string;
}
