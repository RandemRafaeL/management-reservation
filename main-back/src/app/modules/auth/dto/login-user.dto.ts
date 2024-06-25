import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
    @ApiProperty({ example: 'user123', description: 'Nazwa użytkownika' })
    username: string;

    @ApiProperty({ example: 'VerySecret123!', description: 'Hasło' })
    password: string;
}
