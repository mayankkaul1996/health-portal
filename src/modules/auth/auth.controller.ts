import { Body, Controller, Put, UseInterceptors, Version } from '@nestjs/common';
import { ResponseInterceptor } from 'src/libs/core/response.interceptor';
import { ILogger, Logger } from 'src/libs/logging/logger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthResponseDTO, GoogleSigninRequestDTO } from './dto/auth.dto';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {

    private readonly logger: ILogger = Logger.getLogger();

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Put('google/signin')
    @Version('1')
    async signupWithGoogle(@Body() signinDTO: GoogleSigninRequestDTO): Promise<AuthResponseDTO> {

        this.logger.info(`[src][modules][auth][controller][signupWithGoogle][start]`);

        //validate google token
        await this.authService.verifyGoogleToken(signinDTO.accessToken);

        //update or create user
        const user = await this.userService.updateOrCreate(signinDTO);

        //generate jwt
        const accessToken = this.authService.generateJWT(user);

        this.logger.info(`[src][modules][auth][controller][signinWithGoogle][success]`);

        return {
            user,
            accessToken
        };
    }

}
