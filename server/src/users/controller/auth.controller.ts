import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { ProfileDto } from '../dtos/profile.dto';
import { RegisterDto } from '../dtos/register.dto';
import { UserDocument } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { RecoverPasswordDto } from '../dtos/recover.pass.dto';
import { ResetPassDto } from '../dtos/reset.pass.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument, @Session() session: any) {
    const { name, _id, email, isAdmin } = user;

    const { accessToken } = await this.authService.login(name, _id);

    const loggedUser = { name, _id, isAdmin, email, accessToken };

    session.user = loggedUser;

    return loggedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Session() session: any) {
    return session.user;
  }

  @Post('logout')
  async logout(@Session() session: any) {
    //borrar cookie
    session.destroy()
  }

  @Post('register')
  async register(
    @Body() { name, email, password }: RegisterDto,
    @Session() session: any
  ) {
    const user = await this.authService.register(name, email, password);

    const { _id, isAdmin } = user;

    const { accessToken } = await this.authService.login(name, user._id);

    const loggedUser = {
      name: user.name,
      _id,
      isAdmin,
      email: user.email,
      accessToken,
    };

    session.user = loggedUser;
    return loggedUser;
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async updateUser(@Body() credentials: ProfileDto, @Session() session: any) {
    const user = await this.usersService.update(session.user._id, credentials);

    const { name, _id, email, isAdmin } = user;

    const updatedUser = {
      name,
      _id,
      isAdmin,
      email,
      accessToken: session.user.accessToken,
    };

    session.user = updatedUser;

    return updatedUser;
  }
  /**
 * @param email
 * @returns
 */

  @Post("recover-password")
  async recoverPassword(@Body() recoverPassword: RecoverPasswordDto) {
    const result = await this.authService.passwordRecovery(recoverPassword.email);
    return {
      message: "Proceso de recupero de contraseña iniciado exitosamente",
      data: result,
    };

  }
  /**
* @param resetPass
* @returns
*/

  @Post("reset-password")
  async resetPassword(@Body() resetPass: ResetPassDto) {
    await this.authService.resetPassword(resetPass);
    return { message: "Usted ha recuperado su contraseña exitosamente" };
  }
}


