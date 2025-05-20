import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
} from "@nestjs/common";
import { LoginDto, LoginSchema, Me } from "shared";
import { Validation } from "src/utils/zod-validation";
import { GetUser, Public } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Get("me")
	getMe(@GetUser() user: Me) {
		return user;
	}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	@Public()
	@UsePipes(new Validation(LoginSchema))
	signIn(@Body() signInDto: LoginDto) {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}
}
