import { Controller, Get } from "@nestjs/common";
import { Public } from "./api/auth/auth.guard";

@Controller("")
export class AppController {
  @Get()
  @Public()
  getHello(): string {
    return "Backend works!";
  }
}
