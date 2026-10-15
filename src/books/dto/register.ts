import { IsEmail, IsNotEmpty, MaxLength, Min } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({message: "Nama harus di isi"})
  @MaxLength(30, {message: "Nama maksimal 30 karakter"})
  readonly name: string;

  @IsNotEmpty({message: "Email harus di isi"})
  @IsEmail({}, { message: "Format email tidak valid" })
  readonly email: string;

  @IsNotEmpty({message: "Password harus di isi"})
  @Min(3, {message: "Password minimal 3 karakter"})
  @MaxLength(16, {message: "Password maksimal 16 karakter"})
  readonly password: string;

  @IsNotEmpty({message: "Konfirmasi password harus di isi"})
  @Min(3, {message: "Konfirmasi password minimal 3 karakter"})
  @MaxLength(16, {message: "Konfirmasi password maksimal 16 karakter"})
  readonly confirmPassword: string;
}