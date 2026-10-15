import { IsNotEmpty } from "class-validator/types/decorator/common/IsNotEmpty.js";
import { Min } from "class-validator/types/decorator/number/Min.js";

export class LoginDto {
  @IsNotEmpty({message: "Email harus di isi"})
  readonly email: string;



  @Min(6, {message: "Password minimal 6 karakter"})
  readonly password: string;
}