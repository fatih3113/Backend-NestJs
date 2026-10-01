import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';

import { user } from '../books/entities/users-entity.js';
import { RegisterDto } from '../books/dto/register.js';
import { LoginDto } from '../books/dto/login.js';
import { ForgotPasswordDto } from '../books/dto/forgot-password.js';
import { RecoveryPasswordDto } from '../books/dto/recovery-password.js';

type PublicUser = Omit<user, 'password' | 'recoveryToken' | 'recoveryTokenExpires'>;

@Injectable()
export class AuthService {
  private nextId = 2;

  private users: user[] = [
    {
      id: 1,
      name: 'Admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      recoveryToken: null,
      recoveryTokenExpires: null,
    },
  ];

  private toPublic(u: user): PublicUser {
    const { password, recoveryToken, recoveryTokenExpires, ...safe } = u;
    return safe;
  }

  // REGISTER
  async register(registerDto: RegisterDto): Promise<PublicUser> {
    const email = registerDto.email.toLowerCase();

    if (this.users.some((u) => u.email === email)) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const newUser: user = {
      id: this.nextId++,
      name: registerDto.name,
      email,
      password: await bcrypt.hash(registerDto.password, 10),
      recoveryToken: null,
      recoveryTokenExpires: null,
    };

    this.users.push(newUser);
    return this.toPublic(newUser);
  }

  // LOGIN
  async login(loginDto: LoginDto) {
    const found = this.users.find(
      (u) => u.email === loginDto.email.toLowerCase(),
    );

    const valid = found && (await bcrypt.compare(loginDto.password, found.password));
    if (!found || !valid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    return { message: 'Login berhasil', data: this.toPublic(found) };
  }

  // FORGOT PASSWORD
  forgotPassword(dto: ForgotPasswordDto) {
    const found = this.users.find(
      (u) => u.email === dto.email.toLowerCase(),
    );

    if (!found) throw new NotFoundException('Email tidak ditemukan');

    found.recoveryToken = randomBytes(32).toString('hex');
    found.recoveryTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

    // Produksi: kirim token lewat email, jangan dikembalikan di response
    return {
      message: 'Recovery token berhasil dibuat',
      recoveryToken: found.recoveryToken,
    };
  }

  // RESET PASSWORD
  async resetPassword(dto: RecoveryPasswordDto) {
    const found = this.users.find(
      (u) => u.recoveryToken && u.recoveryToken === dto.token,
    );

    if (
      !found ||
      !found.recoveryTokenExpires ||
      found.recoveryTokenExpires < new Date()
    ) {
      throw new BadRequestException('Token tidak valid atau sudah kedaluwarsa');
    }

    found.password = await bcrypt.hash(dto.newPassword, 10);
    found.recoveryToken = null;
    found.recoveryTokenExpires = null;

    return { message: 'Password berhasil diubah' };
  }
}