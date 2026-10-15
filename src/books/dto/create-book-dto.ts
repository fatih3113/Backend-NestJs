import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
  @IsNotEmpty({ message: "Title harus di isi" })
  @IsString({ message: "Title harus berupa teks" })
  readonly title: string;

  @IsNotEmpty({ message: "Author harus di isi" })
  @IsString({ message: "Author harus berupa teks" })
  readonly author: string;

  @IsNotEmpty({ message: "ISBN harus di isi" })
  @IsString({ message: "ISBN harus berupa teks" })
  readonly isbn: string;

  @IsNotEmpty({ message: "Tahun terbit harus di isi" })
  @IsInt({ message: "Tahun terbit harus berupa angka" })
  readonly publishYear: number;
}