import {
	CanActivate,
	ExecutionContext,
	Injectable,
	SetMetadata,
	UnauthorizedException,
	createParamDecorator,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Me } from "shared";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest();

		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync<Me>(token, {
				secret: this.configService.get("JWT_KEY"),
			});
			if (!payload.isActive) {
				throw new UnauthorizedException();
			}
			request.user = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export interface RequestWithUser extends Request {
	user: Me;
}

export const GetUser = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext): Me => {
		const req = ctx.switchToHttp().getRequest();

		return req.user;
	},
);
