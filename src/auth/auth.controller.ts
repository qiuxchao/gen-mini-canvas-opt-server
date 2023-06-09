import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
