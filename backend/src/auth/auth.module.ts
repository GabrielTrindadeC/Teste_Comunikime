import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret:
        'nVnrrXlVcpZGAfKCisKqBWynthvEkZQRgGykvLGSXMfkNewjNQIyZDRRAYHjTKJOrmwhFNEwPmckiSiNjIDoFQkMSZIczNqhDvBoTdYQPhnpUVYCwdWlnYahnrNRTROpsTylhcYeOBOXRiObaOmJIjJDGRNfJt',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
