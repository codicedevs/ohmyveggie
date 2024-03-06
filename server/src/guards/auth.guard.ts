import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.session.user;
  }
}

//El AuthGuard en este caso protege los endpoints verificando si existe un usuario en la sesión HTTP. 