// localization.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LocalizationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const language = req.headers['accept-language'] || 'en';
        req['language'] = language;
        next();
    }
}
