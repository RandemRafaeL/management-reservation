import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
    @Field(() => String)
    contentType: string;

    @Field(() => String)
    fileName: string;

    @Field(() => Int)
    size: number;

    // W GraphQL nie ma wbudowanego typu dla danych binarnych,
    // więc musisz zdecydować, jak chcesz je obsłużyć.
    // Na przykład, możesz przyjąć dane jako String w formacie Base64.
    @Field(() => String)
    dataBase64: string;
}
