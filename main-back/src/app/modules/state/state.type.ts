import { ObjectType, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class StateType {
    @Field(() => ID)
    id: string;

    @Field()
    key: string;

    @Field(() => GraphQLJSON)
    value: any; // Wartość jako prawdziwy typ JSON

    @Field()
    userId: string;

    // @Field()
    // createdAt: Date;
    //
    // @Field()
    // updatedAt: Date;
}
