import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ImagesService } from '../images.service';
import { CreateImageInput } from '../dto/create-image.input';
import { UpdateImageInput } from '../dto/update-image.input';
import { ImageType } from '../entities/image.entity';

@Resolver(() => ImageType)
export class ImagesResolver {
    constructor(private readonly imagesService: ImagesService) {}

    @Mutation(() => ImageType)
    async createImage(@Args('createImageInput') createImageInput: CreateImageInput): Promise<ImageType> {
        return this.imagesService.create(createImageInput);
    }

    @Query(() => [ImageType])
    async images(): Promise<ImageType[]> {
        return this.imagesService.findAll();
    }

    @Query(() => ImageType, { nullable: true })
    async image(@Args('id', { type: () => ID }) id: string): Promise<ImageType> {
        return this.imagesService.findOne(id);
    }

    @Mutation(() => ImageType)
    async updateImage(
        @Args('id', { type: () => ID }) id: string,
        @Args('updateImageInput') updateImageInput: UpdateImageInput
    ): Promise<ImageType> {
        return this.imagesService.update(id, updateImageInput);
    }

    @Mutation(() => Boolean)
    async removeImage(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
        return this.imagesService.remove(id);
    }
}
