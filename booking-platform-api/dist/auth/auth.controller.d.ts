import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(authDto: AuthDto): Promise<{
        access_token: string;
    }>;
    login(authDto: AuthDto): Promise<{
        access_token: string;
    }>;
}
