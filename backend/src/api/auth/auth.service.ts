import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { LoginResponseDto, Me } from "shared";
import { PrismaService } from "src/services/prisma/prisma.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async signIn(username: string, pass: string): Promise<LoginResponseDto> {
		const user = await this.prisma.user.findFirst({
			where: {
				name: username,
			},
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		const goodPassword = await bcryptjs.compare(pass, user?.password);

		if (!goodPassword) {
			throw new UnauthorizedException();
		}
		const payload: Me = {
			id: user.id,
			name: user.name,
			isActive: user.isActive,
		};
		return {
			token: await this.jwtService.signAsync(payload),
		};
	}
}
