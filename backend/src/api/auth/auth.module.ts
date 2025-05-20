import { Module } from "@nestjs/common";
import { PrismaModule } from "src/services/prisma/prisma.module";
import { JWT_MODULE } from "src/utils/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [PrismaModule, JWT_MODULE],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
