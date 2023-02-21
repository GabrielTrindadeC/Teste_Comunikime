import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/auth/Guard/auth.guard';
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
