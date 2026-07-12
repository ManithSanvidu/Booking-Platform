import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(authDto: AuthDto): Promise<{
        access_token: string;
    }>;
    login(authDto: AuthDto): Promise<{
        access_token: string;
    }>;
}
