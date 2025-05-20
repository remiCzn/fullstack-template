import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

export const JWT_MODULE = JwtModule.registerAsync({
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => ({
		global: true,
		secret: configService.getOrThrow("JWT_KEY"),
		signOptions: { expiresIn: "2d" },
	}),
});
