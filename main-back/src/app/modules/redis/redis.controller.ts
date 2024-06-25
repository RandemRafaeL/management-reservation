import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedisService } from './redis.service';

export class SetValueDto {
    [key: string]: never;
}

@ApiTags('Redis')
@Controller('redis')
export class RedisController {
    constructor(private readonly redisService: RedisService) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Set a value in Redis' })
    @ApiResponse({ status: 200, description: 'Value set in Redis' })
    @ApiBody({
        type: SetValueDto,
        examples: {
            a: {
                summary: 'Example 1',
                value: {
                    key1: { subKey: 'value1', subKey2: 'value2' },
                    key2: { subKey: 'value3' },
                },
            },
            b: {
                summary: 'Example 2',
                value: {
                    anotherKey: { property: 'someValue' },
                },
            },
        },
    })
    async setValue(@Body() setValueDto: SetValueDto): Promise<void> {
        for (const [key, value] of Object.entries(setValueDto)) {
            await this.redisService.setValue(key, JSON.stringify(value));
        }
    }

    @Get(':key')
    @ApiOperation({ summary: 'Get a value from Redis' })
    @ApiResponse({ status: 200, description: 'Value retrieved from Redis' })
    @ApiParam({
        name: 'key',
        required: true,
        description: 'The key of the value to retrieve',
        type: String,
        examples: {
            a: {
                summary: 'Example 1',
                value: 'key1',
            },
            b: {
                summary: 'Example 2',
                value: 'anotherKey',
            },
        },
    })
    async getValue(@Param('key') key: string): Promise<string | null> {
        return await this.redisService.getValue(key);
    }
}
