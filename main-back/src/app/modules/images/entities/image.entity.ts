import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ImageType {
    @Field(() => ID)
    id: string;

    @Field()
    dataBase64(): string {
        return this.data.toString('base64');
    }

    @Field({ nullable: true })
    contentType?: string;

    @Field({ nullable: true })
    fileName?: string;

    @Field(() => Number, { nullable: true })
    size?: number;

    @Field(() => Date)
    createdAt: Date;

    // Tymczasowe pole do przechowywania danych binarnych, nie eksponowane przez GraphQL
    data?: Buffer;
}
