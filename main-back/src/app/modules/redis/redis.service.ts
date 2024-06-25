import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
        this.redisClient = new Redis({
            host: 'localhost', // Adres hosta Redisa
            port: 6379, // Port Redisa
            // Dodatkowe opcje, jeśli są potrzebne
        });
    }
    // Przykładowa metoda do zapisu wartości
    async setValue(key: string, value: string): Promise<void> {
        await this.redisClient.set(key, value);
    }

    // Przykładowa metoda do pobierania wartości
    async getValue(key: string): Promise<string | null> {
        return await this.redisClient.get(key).then();
    }
}
