import { ApiProperty } from '@nestjs/swagger';
import { SuccessVO } from 'src/common/dto/success.dto';

export class UserInfoItem {
  /**
   * 用户id
   * @example 1
   */
  id: number;

  /**
   * 创建时间
   * @example 2021-01-1 00:00:00
   */
  createTime: Date;

  /**
   * 更新时间
   * @example 2021-01-1 00:00:00
   */
  updateTime: Date;

  /**
   * 手机号
   * @example 13088888888
   */
  mobile: string;
}

export class UserInfoVO {
  @ApiProperty({ type: UserInfoItem })
  info: UserInfoItem;
}

export class UserInfoSuccessVO extends SuccessVO {
  // TODO 看具体信息
  @ApiProperty({
    description: '数据',
    type: () => UserInfoVO,
    example: UserInfoVO,
  })
  data: UserInfoVO;
}
