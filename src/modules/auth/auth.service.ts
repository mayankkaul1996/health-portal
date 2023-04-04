import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import ResponseConstants from 'src/constants/response.contants';
import { ILogger, Logger } from 'src/libs/logging/logger';
import { UserDocument } from '../user/schemas/user.schema';
const { OAuth2Client } = require('google-auth-library');

@Injectable()
export class AuthService {

    private readonly logger: ILogger = Logger.getLogger();

    constructor(
        private readonly configService: ConfigService,
    ) { }

    async verifyGoogleToken(token: string): Promise<any> {
        this.logger.info(`[src][modules][auth][service][verifyGoogleToken][start]`);
        const oauthClient = new OAuth2Client(this.configService.get('google.clientId'));
        try {
            const ticket = await oauthClient.verifyIdToken({
                idToken: token,
                audience: this.configService.get('google.clientId')
            });
            const payload = ticket.getPayload();
            this.logger.info(`token verified by google with payload : ${JSON.stringify(payload)}`);
            return payload;
        } catch (err) {
            this.logger.error(`token not verified by google : ${token}`);
            this.logger.error(err.message);
            throw new UnauthorizedException(ResponseConstants.Auth.GOOGLE_VERIFICATION_FAILED);
        }
    }

    generateJWT(user: UserDocument): string {
        const jwtAgeSeconds: number = 30 * 24 * 60 * 60;
        this.logger.info(`[src][modules][auth][service][generateJWT][start]`);
        let payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        return sign(payload, this.configService.get('jwtSecret'), {
            expiresIn: jwtAgeSeconds,
            notBefore: 0,
            issuer: 'health.com',
            audience: '*.health.com'
        });
    }

    verifyJWT(token: string): string | JwtPayload {
        this.logger.info(`[src][modules][auth][service][verifyJWT][start]`);
        return verify(token, this.configService.get('jwtSecret'));
    }

}
