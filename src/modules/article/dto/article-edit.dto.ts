import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex.util';
import { ArticleCreateDTO } from './article-create.dto';
import { IdDTO } from './id.dto';

export class ArticleEditDTO extends ArticleCreateDTO {
  @ApiProperty({
    description: '文章id',
    example: 1,
  })
  @Matches(regPositive, { message: '请输入有效 id' })
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
