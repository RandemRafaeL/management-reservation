import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { ValidationError } from 'class-validator';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import * as bodyParser from 'body-parser';

// START APPLICATION
bootstrap().then();

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);

    // Ustawienie globalnego potoku walidacji
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: false,
            forbidNonWhitelisted: true,
            transform: true,

            exceptionFactory: (errors: ValidationError[]) => {
                console.log(errors);

                const validationErrors = errors.reduce((acc, err) => {
                    acc[err.property] = Object.values(err.constraints).join('. ');
                    return acc;
                }, {});

                throw new BadRequestException(
                    JSON.stringify({
                        validationErrors,
                    })
                );
            },
        })
    );

    app.enableCors();

    checkAndCreatImagesDirectory();

    app.use('/image', express.static(process.env.IMAGES_PATH));

    // Ustawienie maksymalnego rozmiaru body
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

    await app.listen(process.env.PORT || 3000);
}

function checkAndCreatImagesDirectory() {
    const directoryPath = path.resolve(process.env.IMAGES_PATH);

    fs.access(directoryPath, fs.constants.F_OK, err => {
        if (err) {
            fs.mkdir(directoryPath, { recursive: true }, error => {
                if (error) {
                    console.error('Nie udało się utworzyć katalogu:', error);
                } else {
                    console.log('Katalog utworzony pomyślnie');
                }
            });
        }
    });
}
