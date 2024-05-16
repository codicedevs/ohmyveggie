import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) throw new NotFoundException('Invalid email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      throw new BadRequestException('Invalid email or password');

    return user;
  }

  async login(username: string, userId: string) {
    const payload = { username, sub: userId };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, password: string) {
    const existingUser = await this.usersService.findOne(email);

    if (existingUser) throw new BadRequestException('Email is already in use.');

    const encryptedPassword = await encryptPassword(password);

    const user = await this.usersService.create({
      email,
      password: encryptedPassword,
      isAdmin: false,
      name,
    });

    return user;
  }
  /**
 * Esta funcion en primera instancia chequea si el usuario existe mediante su correo
 * Si existe crea un resetKey y un resetKeyTimeStamp, el segundo es una marca de tiempo para manejar la expiracion del primero
 * Por ultimo tanto resetKey como resetKeyTimeStamp se almacenan como propiedades en el usuario
 * Una vez creado resetkey y timeStamp se le envia al usuario por e mail el reset key para que pueda enviarlas
 * @param email
 * @returns
 */

  async passwordRecovery(email: string) {
    const user = await this.usersService.findOne(email);
    const resetKey = Math.floor(Math.random() * (99999 - 10000) + 10000);
    const resetKeyTimeStamp = new Date().toISOString();
    await this.usersService.update(user.id, {
      resetKey: resetKey,
      resetKeyTimeStamp: resetKeyTimeStamp,
    });
    await this.emailService.sendPasswordRecovery(user, resetKey);
    const userUpdated = await this.usersService.findOne(email);
    return { userUpdated, resetKey };
  }

  /**
* Esta funcion recibe lo referente en resetPassBody para actualizar la contraseña de un usuario que envia el resetKey que recibio
* Compara que el resetKey sea igual al generado en su modelo (cuando solicito el cambio de contraseña), y tambien determina que no este expirado (12hs)
* Si el proceso es correcto se actualiza la password del usuario y se establece resetKey en undefined, por haber sido utilizado
* @param resetPassBody
* @returns
*/

  async resetPassword(resetPassBody: {
    resetKey: number;
    email: string;
    password: string;
  }) {
    const user = await this.usersService.findOne(
      resetPassBody.email
    );
    if (user.resetKey != resetPassBody.resetKey) {
      throw new UnauthorizedException({ message: "El reset key es invalido" });
    }
    // Reset password key, tiene 12 hs de validez
    const keyFromUser = new Date(user.resetKeyTimeStamp);
    const actualDate = new Date();
    const differenceInHours = Math.abs(actualDate.getTime() - keyFromUser.getTime()) / (1000 * 60 * 60);
    if (differenceInHours > 12) {
      throw new UnauthorizedException(
        { message: "El reset key ha expirado, tiene una validez de 12 horas." }
      );
    }
    // Actualiza la contraseña del usuario cuando el proceso de resetKey es exitoso
    await this.usersService.update(user.id, {
      password: resetPassBody.password,
    });
    // Resetea el resetKey en el modelo de usuario cuando es usado exitosamente
    await this.usersService.update(user.id, {
      resetKey: null,
    });
    return;
  }
}
