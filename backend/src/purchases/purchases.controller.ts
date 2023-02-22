import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { AuthGuard } from '../auth/Guard/auth.guard';
import { RoleGuard } from '../guard/role.guard';
import { Role } from '../enum/role.enum';
import { Roles } from '../decorator/roles.decorator';
@UseGuards(AuthGuard, RoleGuard)
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) { }
  @Post()
  create(
    @Body('userId') userId: number,
    @Body('productsId') productsId: number[],
  ) {
    return this.purchasesService.create(userId, productsId);
  }
  @Roles(Role.Admin)
  @Get()
  getAll() {
    return this.purchasesService.getAll();
  }
  @Get(':userId')
  async findByUserId(@Param('userId') userId: number) {
    return this.purchasesService.findByUserId(userId);
  }
}
