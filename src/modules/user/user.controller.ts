import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user.service';
import { TokenResponse } from './vo/token.vo';
import { UserInfoSuccessVO } from './vo/user-info.vo';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ description: '注册', type: UserInfoSuccessVO })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<UserInfoSuccessVO> {
    return this.userService.register(registerDTO);
  }

  @ApiOkResponse({ description: '登陆', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<UserInfoSuccessVO> {
    return this.userService.login(loginDTO);
  }
}
