import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ImageTable } from '@prisma/client';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { ImageType } from './entities/image.entity';

function toGraphQLImageType(prismaImage: ImageTable): ImageType {
    const { id, data, contentType, fileName, size, createdAt } = prismaImage;
    const imageType = new ImageType();
    imageType.id = id;
    imageType.data = data; // Bufor danych, nie jest bezpośrednio eksponowany przez GraphQL
    imageType.contentType = contentType;
    imageType.fileName = fileName;
    imageType.size = size;
    imageType.createdAt = createdAt;

    return imageType;
}

@Injectable()
export class ImagesService {
    constructor(private prisma: PrismaService) {}

    async create(createImageInput: CreateImageInput): Promise<ImageType> {
        const imageBuffer = Buffer.from(createImageInput.dataBase64, 'base64');
        const prismaCreateInput = {
            ...createImageInput,
            data: imageBuffer,
        };
        delete prismaCreateInput.dataBase64;

        const prismaImage = await this.prisma.imageTable.create({
            data: prismaCreateInput,
        });

        return toGraphQLImageType(prismaImage);
    }

    async findAll(): Promise<ImageType[]> {
        const prismaImages = await this.prisma.imageTable.findMany();
        return prismaImages.map(toGraphQLImageType);
    }

    async findOne(id: string): Promise<ImageType | null> {
        const prismaImage = await this.prisma.imageTable.findUnique({
            where: { id },
        });

        if (!prismaImage) return null;
        return toGraphQLImageType(prismaImage);
    }

    async update(id: string, updateImageInput: UpdateImageInput): Promise<ImageType> {
        const updatedPrismaImage = await this.prisma.imageTable.update({
            where: { id },
            data: updateImageInput,
        });

        return toGraphQLImageType(updatedPrismaImage);
    }

    async remove(id: string): Promise<boolean> {
        await this.prisma.imageTable.delete({
            where: { id },
        });
        return true;
    }
}
