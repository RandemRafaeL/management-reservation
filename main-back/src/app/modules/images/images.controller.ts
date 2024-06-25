import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import * as process from 'process';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Get('test')
    getHello(): { message: string } {
        return { message: 'Images controller works' };
    }
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: process.env.IMAGES_PATH,
                filename: (req, file, callback) => {
                    const fileExtName = path.extname(file.originalname);
                    const randomName = uuidv4(); // Generowanie unikalnej nazwy pliku
                    callback(null, `${randomName}${fileExtName}`);
                },
            }),
        })
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            originalname: file.originalname,
            filename: file.filename,
            path: `image/${file.filename}`,
        };
    }
}
