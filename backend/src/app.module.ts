import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthGuard } from "./api/auth/auth.guard";
import { AuthModule } from "./api/auth/auth.module";
import { PrismaModule } from "./services/prisma/prisma.module";
import { JWT_MODULE } from "./utils/jwt";
import { join } from "node:path";
import { AppController } from "./app.controller";

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "assets"),
			serveRoot: "/assets",
		}),
		JWT_MODULE,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
	controllers: [AppController],
})
export class AppModule {}
