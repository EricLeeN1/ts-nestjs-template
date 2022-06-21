import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from 'src/config/jwt/jwt.config';
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register(jwtConstants)],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
