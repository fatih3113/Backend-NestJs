import { IsNotEmpty } from "class-validator";
import { Min } from "class-validator";

export class LoginDto {
  @IsNotEmpty({message: "Email harus di isi"})
  readonly email: string;



  @Min(6, {message: "Password minimal 6 karakter"})
  readonly password: string;
}