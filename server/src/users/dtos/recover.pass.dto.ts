import { IsEmail } from "class-validator";

export class RecoverPasswordDto {
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email: string
  }