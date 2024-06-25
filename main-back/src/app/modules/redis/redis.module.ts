import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import Redis from 'ioredis';

@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useValue: new Redis({
                host: 'localhost', // lub adres Docker hosta, jeśli uruchamiasz lokalnie
                port: 6379, // domyślny port Redisa
            }),
        },
        RedisService,
    ],
    exports: ['REDIS_CLIENT', RedisService],
    controllers: [RedisController],
})
export class RedisModule {}
