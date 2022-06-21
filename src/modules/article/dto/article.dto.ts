import { IsNotEmpty } from 'class-validator';

export class ArticleDTO {
  /**
   * 文章标题
   * @example 啊！美丽的大海
   */
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title: string;

  /**
   * 文章简述
   * @example 给你讲述美丽的大海
   */
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description: string;

  /**
   * 文章内容
   * @example 啊！美丽的大海，你是如此美丽
   */
  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content: string;

  /**
   * 文章类型
   * @example others/self 第三方报道/企业新闻
   */
  @IsNotEmpty({ message: '请选择文章类型' })
  readonly type: string;

  /**
   * 文章链接
   * @example 类型为第三方报道的链接
   */
  @IsNotEmpty({ message: '请输入文章链接地址' })
  readonly url: string;

  /**
   * 文章封面
   * @example 文章封面地址
   */
  @IsNotEmpty({ message: '请输入文章封面' })
  readonly logo: string;
}
