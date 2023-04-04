import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDocument } from "../user/schemas/user.schema";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

@Injectable()
export class JWTGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const request = ctx.switchToHttp().getRequest();
        const response = ctx.switchToHttp().getResponse();

        const jwt: string = request.get('Authorization');

        if (!jwt) throw new UnauthorizedException();

        const payload: any = this.authService.verifyJWT(jwt);
        const user: UserDocument = await this.userService.findOne(payload.id);
        response.locals.user = user;

        return true;
    }
}