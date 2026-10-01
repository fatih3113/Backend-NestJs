import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from '../books/dto/register.js';
import { LoginDto } from '../books/dto/login.js';
import { ForgotPasswordDto } from '../books/dto/forgot-password.js';
import { RecoveryPasswordDto } from '../books/dto/recovery-password.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: RecoveryPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}