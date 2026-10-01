import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { AuthService } from './auth/auth.service.js';
import { AuthController } from './auth/auth.controller.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [BooksModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})

export class AppModule {}