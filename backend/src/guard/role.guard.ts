import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const reqRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!reqRoles) {
      return true;
    }
    const { info } = context.switchToHttp().getRequest();
    const rolesFilter = reqRoles.filter((role) => role === info.role);
    return rolesFilter.length > 0;
  }
}
